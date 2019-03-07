const joi = require('joi');
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const idGenerator = require('../utilities/id-generator');
const gameStateSchema = require('../schemas/game-state-schema');
const generateInitBoard = require('../utilities/game-board-generator');

const MAX_ATTEMPTS = 50;

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

// TODO: Join a game
router.get('/game/:gameid', (req, res) => {
    res.json({success: true});
});

// Create a game
router.post('/game', (req, res) => {
    // Connect to MongoDB Server
    client.connect(async (err, client) => {
        if (err) {
            console.log('Unable to connect to database', err);
            res.send({ 'failure': true, 'message': 'Unable to connect to database', 'error': err });
        } else {
            console.log('Connection to Database Established');

            const db = client.db(dbName);

            const collection = db.collection('games');

            
            let gameID = null;
            let alreadyExists = true;

            // Attempts at generating a random gameID that doesn't already exist in the DB
            let attempts = 0;

            do {
                if (attempts > MAX_ATTEMPTS) {
                    console.log('Reached max attempts at generating random gameID');
                    res.send({ 'failure': true, 'message': 'Reached max attempts at generating random gameID'});
                    return;
                }

                // Generate a game ID
                gameID = idGenerator.generateGameID();
                
                // Verify gameID doesn't already exist in the database
                let err, result = await collection.findOne({game_id: gameID});
                
                if (err) {
                    res.send({ 'failure': true, 'message': 'Error querying by gameID generated', 'error': err });
                    return;
                }
                else if (result) {
                    console.log('gameID generated already exists', result);
                }
                else {
                    alreadyExists = false;
                }

                attempts++;

            } while (alreadyExists);

            // Generate player tokens
            const player1Token = idGenerator.generatePlayerToken();
            const player2Token = idGenerator.generatePlayerToken();

            // Generate inital game state/board
            let initGameBoard = generateInitBoard();

            // Assemble game state document for storage in database
            const gameState = { 
                game_id: gameID, 
                player1_token: player1Token, 
                player2_token: player2Token, 
                board_state: initGameBoard 
            };

            // Validate gamestate using Joi
            joi.validate(gameState, gameStateSchema, (err, value)=> {
                if (err) {
                    console.log('Game state validation failure:', err);
                    res.send({ 'failure': true, 'message': 'Game state validation failure', 'error': err });
                } else {
                    // insert game state to the database
                    collection.insertOne(gameState, (err, result) => {
                        if (err) {
                            console.log('Database insert failure:', err);
                            res.send({ 'failure': true, 'message': 'Database insert failure', 'error': err });
                        } else {
                            console.log(`Successfully inserted item with _id: ${result.insertedId}`);
                            res.send(value);
                        }
                    });
                }
            });
        }
    });
});

// TODO: Connect a player
router.post('/game/', (req, res) => {
    res.json({success: true});
});

// TODO: Make a move on the game board
router.put('/game', (req, res) => {
    res.json({success: true});
});

// TODO: Ping backend to keep connection alive
router.post('/ping/', (req, res) => {
    res.json({success: true});
});

// TODO: Send a chat message
router.post('/chat', (req, res) => {
    res.json({success: true});
});

module.exports = router;
