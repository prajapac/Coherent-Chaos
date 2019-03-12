const joi = require('joi');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const idGenerator = require('../utilities/id-generator');
const gameStateSchema = require('../schemas/game-state-schema');
const generateInitBoard = require('../utilities/game-board-generator');
const log = require('../utilities/logger');

const MAX_ATTEMPTS = 50;

const FILE_NAME = 'routes/api.js';

// Middleware to parse the POST data of req bodies
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Database connection URL (27017 is default MongoDB port)
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'coherentchaos';

// Create a new MongoClient
const client = new MongoClient(url, {useNewUrlParser: true});

// API root
router.get('/', (req, res) => {
    res.json({success: true});
});

// Create game
router.post('/game', (req, res) => {
    // Connect to MongoDB Server
    client.connect(async (err, client) => {
        if (err) {
            log(FILE_NAME, ('Unable to connect to database', err));
            res.send({ 'failure': true, 'message': 'Unable to connect to database', 'error': err });
        } else {
            const db = client.db(dbName);

            const collection = db.collection('games');

            let gameID = null;
            let alreadyExists = true;

            // Attempts at generating a random gameID that doesn't already exist in the DB
            let attempts = 0;

            do {
                if (attempts > MAX_ATTEMPTS) {
                    log(FILE_NAME, 'Reached max attempts at generating random gameID');
                    res.send({ 'failure': true, 'message': 'Reached max attempts at generating random gameID'});
                    return;
                }

                // Generate a game ID
                gameID = idGenerator.generateGameID();
                
                // Verify gameID doesn't already exist in the database
                let err, result = await collection.findOne({game_id: gameID});
                
                if (err) {
                    log(FILE_NAME, ('Error querying by gameID generated:', err));
                    res.send({ 'failure': true, 'message': 'Error querying by gameID generated', 'error': err });
                    return;
                }
                else if (result) {
                    log(FILE_NAME, ('gameID generated already exists', result));
                }
                else {
                    alreadyExists = false;
                }

                attempts++;

            } while (alreadyExists);
            
            // Generate inital game state/board
            let initGameBoard = generateInitBoard();

            // Assemble game state document for storage in database
            const gameState = { 
                game_id: gameID, 
                board_state: initGameBoard 
            };

            // Validate gamestate using Joi
            joi.validate(gameState, gameStateSchema, (err, value)=> {
                if (err) {
                    log(FILE_NAME, ('Game state validation failure:', err));
                    res.send({ 'failure': true, 'message': 'Game state validation failure', 'error': err });
                } else {
                    // insert game state to the database
                    collection.insertOne(gameState, (err, result) => {
                        if (err) {
                            log(FILE_NAME, ('Database insert failure:', err));
                            res.send({ 'failure': true, 'message': 'Database insert failure', 'error': err });
                        } else {
                            log(FILE_NAME, (`Successfully inserted item with _id: ${result.insertedId}`));
                            res.send(value);
                        }
                    });
                }
            });
        }
    });
});

// TODO: Get game state
router.get('/game/:id/', (req, res) => {
    res.json({success: true});
});

// Connect player
router.post('/game/:id/', (req, res) => {

    // Connect to MongoDB Server
    client.connect(async (err, client) => {
        if (err) {
            log(FILE_NAME, ('Unable to connect to database', err));
            res.send({ 'failure': true, 'message': 'Unable to connect to database', 'error': err });
        } else {
            const db = client.db(dbName);

            const collection = db.collection('games');
            
            let gameID = req.params.id;
            let playerChoice = req.body.playerChoice;

            // Get game state for game with gameID
            let err, gameState = await collection.findOne({game_id: gameID});
                
            if (err) {
                log(FILE_NAME, ('Error querying by gameID generated:', err));
                res.send({ 'failure': true, 'message': 'Error querying by gameID generated', 'error': err });
                return;
            }
            else if (gameState) {
                if (playerChoice === 'player1') {
                    // Player choice already taken
                    if (gameState.player1_token) { 
                        gameState.player2_token = idGenerator.generatePlayerToken();
                        gameState.player2_last_ping = Date.now();
                        playerChoice = 'player2';
                    }
                    else {
                        gameState.player1_token = idGenerator.generatePlayerToken();
                        gameState.player1_last_ping = Date.now();
                    }
                } 
                else {
                    // Player choice already taken
                    if (gameState.player2_token) { 
                        gameState.player1_token = idGenerator.generatePlayerToken();
                        gameState.player1_last_ping = Date.now();
                        playerChoice = 'player1';
                    }
                    else {
                        gameState.player2_token = idGenerator.generatePlayerToken();
                        gameState.player2_last_ping = Date.now();
                    }
                }
            }
            else {
                log(FILE_NAME, ('gameID does not exist', gameID));
                res.send({ 'failure': true, 'message': 'gameID does not exist', 'gameID': gameID });
                return;
            }

            // Validate gamestate using Joi
            joi.validate(gameState, gameStateSchema, (err, value)=> {
                if (err) {
                    log(FILE_NAME, ('Game state validation failure:', err));
                    res.send({ 'failure': true, 'message': 'Game state validation failure', 'error': err });
                } else {
                    // update game state in the database
                    collection.updateOne({game_id: gameID}, {$set: gameState}, (err, result) => { // eslint-disable-line no-unused-vars 
                        if (err) {
                            log(FILE_NAME, ('Database insert failure:', err));
                            res.send({ 'failure': true, 'message': 'Database insert failure', 'error': err });
                        } else {
                            log(FILE_NAME, (`Successfully updated item with _id: ${value._id}`));
                            if (playerChoice === 'player1') {
                                res.send({player1_token: value.player1_token});
                            } else {
                                res.send({player2_token: value.player2_token});
                            }
                        }
                    });
                }
            });
        }
    });
});

// TODO: Ping backend to keep connection alive
router.patch('/game/:id/', (req, res) => {
    // Connect to MongoDB Server
    client.connect(async (err, client) => {
        if (err) {
            log(FILE_NAME, ('Unable to connect to database', err));
            res.send({ 'failure': true, 'message': 'Unable to connect to database', 'error': err });
        } else {
            const db = client.db(dbName);

            const collection = db.collection('games');
            
            let player1_token; 
            let player2_token;
            let gameID = req.params.id;

            if (req.body.player1_token) {
                player1_token = req.body.player1_token;
            }
            else if (req.body.player2_token) {
                player2_token = req.body.player2_token;
            }
            else {
                log(FILE_NAME, 'Missing player token/Improper POST body format');
                res.send({ 'failure': true, 'message': 'Missing player token/Improper POST body format' });
                return;
            }

            // Get game state for game with gameID
            let err, gameState = await collection.findOne({game_id: gameID});
                
            if (err) {
                log(FILE_NAME, ('Error querying by gameID generated:', err));
                res.send({ 'failure': true, 'message': 'Error querying by gameID generated', 'error': err });
                return;
            }
            else if (gameState) {
                if (player1_token) {
                    // Update player 1 last pinged time
                    gameState.player1_last_ping = Date.now();
                }
                else if (player2_token) {
                    // Update player 2 last pinged time
                    gameState.player2_last_ping = Date.now();
                }
            }
            else {
                log(FILE_NAME, ('gameID does not exist', gameID));
                res.send({ 'failure': true, 'message': 'gameID does not exist', 'gameID': gameID });
                return;
            }

            // Validate gamestate using Joi
            joi.validate(gameState, gameStateSchema, (err, value)=> {
                if (err) {
                    log(FILE_NAME, ('Game state validation failure:', err));
                    res.send({ 'failure': true, 'message': 'Game state validation failure', 'error': err });
                } else {
                    // update game state in the database
                    collection.updateOne({game_id: gameID}, {$set: gameState}, (err, result) => { // eslint-disable-line no-unused-vars 
                        if (err) {
                            log(FILE_NAME, ('Database insert failure:', err));
                            res.send({ 'failure': true, 'message': 'Database insert failure', 'error': err });
                        } else {
                            log(FILE_NAME, (`Successfully updated item with _id: ${value._id}`));
                            
                            // Remove unnecessary fields from game state to send player
                            delete value.player1_token;
                            delete value.player2_token;
                            delete value.player1_last_ping;
                            delete value.player2_last_ping;

                            res.send(value);
                        }
                    });
                }
            });
        }
    });
});

// TODO: Make a move on game board
router.post('/game/:id/board/', (req, res) => {
    res.json({success: true});
});

// TODO: Send chat message
router.post('/game/:id/chat/', (req, res) => {
    res.json({success: true});
});

module.exports = router;
