const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
const expect = require('chai').expect;
const joi = require('joi');
const gameStateSchema = require('../../schemas/game-state-schema');

// express router
let app;

// game ID for testing
let gameID;

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
    describe('root: GET /api/', () => {
        it('should return a success json object in res', ()=> {
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
                });
        });
    });

    describe('Connect player: POST /api/game/:id/', () => {
        it('should accept a player choice and return a valid token', () => {
        });
    });

    describe('Ping to keep connection alive: PATCH /api/game/:id/', () => {

    });

    describe('Make a move on game board: POST /api/game/:id/board', () => {

    });
});
