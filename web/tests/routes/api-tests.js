const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const joi = require('joi');
const idGenerator = require('../../utility/id-generator');
const gameStateSchema = require('../../schemas/game-state-schema');

// express router
let app;

// game ID and player tokens for testing
let gameID;
let player1Token;
let player2Token;

// Configure chai
chai.use(chaiHttp);
chai.should();

before(() => {
    return new Promise((resolve) => {
        require('../../utility/db').initDB((err) => {
            if (err) { throw err; }
        
            const express = require('express');
            const path = require('path');
            const apiRoutes = require('../../routes/api.js');
            const notFoundRoutes = require('../../routes/404.js');
        
            const log = require('../../utility/logger')('index', 'white', 'green');
        
            app = express();
        
            // Serve static files
            app.use(express.static('public'));
        
            // Serve the React app
            app.use('/', express.static(path.join(__dirname, '/client/build'))); // eslint-disable-line no-undef
        
            // Serve API routes
            app.use('/api', apiRoutes);
        
            // Serve all other routes
            app.use('*', notFoundRoutes);
        
            // Catch errors
            app.use(function(err, req, res, next) { // eslint-disable-line no-unused-vars
                return res.status(500).send({error: err});
            });
        
            // Start the server
            const port = process.env.PORT || 5000; // eslint-disable-line no-undef
            app.listen(port, (err) => {
                if (err) {
                    throw err;
                }
                log('App is listening on port ' + port + '\r\n');
            });
            resolve();
        });
    });
});

describe('API endpoints', () => {

    afterEach((done) => {
        setTimeout( () => {
            done();
        }, 1000);
    });

    describe('root: GET /api/', () => {
        it('should return a success json object', ()=> {
            chai.request(app)
                .get('/api/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    expect(res.body).to.have.property('success', true);
                });
        });
    });

    describe('Create game: POST /api/game', () => {
        it('should create and return a valid game state object', ()=> {
            chai.request(app)
                .post('/api/game')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    player1Token = res.body.token;
                    delete res.body.token;

                    joi.validate(res.body, gameStateSchema, (err, value) => { // eslint-disable-line no-unused-vars
                        expect(err).to.equal(null);
                        gameID = res.body.game_id;
                    });
                });
        });
    });

    describe('Get game state: GET /api/game/:id/', () => {
        it('should return the game state object for ID passed in URI', ()=> {
            chai.request(app)
                .get(`/api/game/${gameID}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    expect(res.body).to.have.property('player_1_active', true);
                    expect(res.body).to.have.property('player_2_active', false);

                    delete res.body.player_1_active;
                    delete res.body.player_2_active;
                    
                    joi.validate(res.body, gameStateSchema, (err, value) => { // eslint-disable-line no-unused-vars
                        expect(err).to.equal(null);
                        gameID = res.body.game_id;
                    });
                });
        });
    });

    describe('Connect player: POST /api/game/:id/', () => {
        it('should accept a player choice and return a valid token', () => {
            chai.request(app)
                .post(`/api/game/${gameID}`)
                .send({ playerChoice: 2 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    const schema = joi.object().keys({
                        token: joi.string().allow('').alphanum().length(idGenerator.PLAYER_TOKEN_LENGTH),
                    });

                    joi.validate(res.body, schema, (err, value) => { // eslint-disable-line no-unused-vars
                        expect(err).to.equal(null);
                        player2Token = res.body.token;
                    });
                });
        });

        it('should reject a player choice if game is full', () => {
            chai.request(app)
                .post(`/api/game/${gameID}`)
                .send({ playerChoice: 2 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    expect(res.body).to.have.property('failure', true);
                    expect(res.body).to.have.property('message', 'Game is full');
                    expect(res.body).to.have.property('gameID', `${gameID}`);
                });
        });

        it('should reject if player choice if invalid', () => {
            chai.request(app)
                .post(`/api/game/${gameID}`)
                .send({ playerChoice: null })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    expect(res.body).to.have.property('failure', true);
                    expect(res.body).to.have.property('message', 'Invalid player choice or player still connected');
                    expect(res.body).to.have.property('gameID', `${gameID}`);
                    expect(res.body).to.have.property('playerChoice', null);
                });
        });
    });

    describe('Ping to keep connection alive: PATCH /api/game/:id/', () => {
        it('should accept a player token to keep connection alive', () => {
            chai.request(app)
                .patch(`/api/game/${gameID}`)
                .send({ token: `${player1Token}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    expect(res.body).to.have.property('player_1_active', true);
                    expect(res.body).to.have.property('player_2_active', true);

                    delete res.body.player_1_active;
                    delete res.body.player_2_active;

                    joi.validate(res.body, gameStateSchema, (err, value) => { // eslint-disable-line no-unused-vars
                        expect(err).to.equal(null);
                    });
                });
        });

        it('should reject invalid player token', () => {
            chai.request(app)
                .patch(`/api/game/${gameID}`)
                .send({ token: 'F00BAR' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    expect(res.body).to.have.property('failure', true);
                    expect(res.body).to.have.property('message', 'playerToken is invalid');
                });
        });

        it('should reject missing player token', () => {
            chai.request(app)
                .patch(`/api/game/${gameID}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    expect(res.body).to.have.property('failure', true);
                    expect(res.body).to.have.property('message', 'Missing playerToken or improper POST body format');
                });
        });

        it('should reject improper POST body format', () => {
            chai.request(app)
                .patch(`/api/game/${gameID}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    expect(res.body).to.have.property('failure', true);
                    expect(res.body).to.have.property('message', 'Missing playerToken or improper POST body format');
                });
        });

    });

    describe('Make a move on game board: POST /api/game/:id/board', () => {
        it('should accept a valid game move from a valid player token', () => {
            chai.request(app)
                .post(`/api/game/${gameID}/board`)
                .send({
                    'token': `${player1Token}`,
                    'move': {
                        selectedCell: {
                            rowIndex: 1,
                            columnIndex: 3
                        },
                        targetCell: {
                            rowIndex: 2,
                            columnIndex: 4
                        },
                        hoppedCell: null
                    }
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    
                    expect(res.body).to.have.property('player_1_active', true);
                    expect(res.body).to.have.property('player_2_active', true);

                    delete res.body.player_1_active;
                    delete res.body.player_2_active;

                    joi.validate(res.body, gameStateSchema, (err, value) => { // eslint-disable-line no-unused-vars
                        expect(err).to.equal(null);
                    });
                });
        });

        it('should reject invalid game moves from valid player tokens', () => {
            chai.request(app)
                .post(`/api/game/${gameID}/board`)
                .send({
                    'token': `${player2Token}`,
                    'move': {
                        selectedCell: {
                            rowIndex: 1,
                            columnIndex: 1
                        },
                        targetCell: {
                            rowIndex: 1,
                            columnIndex: 3
                        },
                        hoppedCell: {
                            rowIndex: 1,
                            columnIndex: 2
                        }
                    }
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    
                    expect(res.body).to.have.property('failure', true);
                    expect(res.body).to.have.property('message', 'Invalid move instructions');
                });
        });

        it('should reject valid game moves if it isn\'t  player token\'s turn', () => {
            chai.request(app)
                .post(`/api/game/${gameID}/board`)
                .send({
                    'token': `${player1Token}`,
                    'move': {
                        selectedCell: {
                            rowIndex: 1,
                            columnIndex: 1
                        },
                        targetCell: {
                            rowIndex: 1,
                            columnIndex: 3
                        },
                        hoppedCell: {
                            rowIndex: 1,
                            columnIndex: 2
                        }
                    }
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    expect(res.body).to.have.property('failure', true);
                    expect(res.body).to.have.property('message', 'It is not your turn');
                });
        });

        it('should reject if missing player token', () => {
            chai.request(app)
                .post(`/api/game/${gameID}/board`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    expect(res.body).to.have.property('failure', true);
                    expect(res.body).to.have.property('message', 'Missing playerToken or improper POST body format');
                });
        });

        it('should reject improper POST body format', () => {
            chai.request(app)
                .post(`/api/game/${gameID}/board`)
                .send({ John: 'Doe' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    expect(res.body).to.have.property('failure', true);
                    expect(res.body).to.have.property('message', 'Missing playerToken or improper POST body format');
                });
        });
    });
});
