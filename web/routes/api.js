const Joi = require('joi');
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const idGenerator = require('../utilities/idgenerator');
const gameStateSchema = require('../schemas/gamestateschema');
const generateInitBoard = require('../utilities/gameboardgenerator');

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

// Join a game
router.get('/game/:gameid', (req, res) => {
    res.json({success: true});
});

// Create a game
router.post('/game', (req, res) => {
    // Connect to MongoDB Server
    client.connect((err, client) => {
        if (err) {
            console.log('Unable to connect to MongoDB server', err);
            res.send('Unable to connect to MongoDB server', err);
        } else {
            console.log('Connection to Database Established');

            const db = client.db(dbName);

            const collection = db.collection('games');

            // Generate a game ID
            const gameID = idGenerator.generateGameID();

            // Generate player tokens
            const player1Token = idGenerator.generatePlayerToken();
            const player2Token = idGenerator.generatePlayerToken();

            // Generate inital game state/board
            const initGameBoard = generateInitBoard();

            // Assemble game state document for storage in database
            const gameState = {game_id: gameID, player1_token: player1Token, player2_token: player2Token, board_state: initGameBoard};

            // validate gamestate using Joi
            Joi.validate(gameState, gameStateSchema, (err, value)=> {
                if (err) {
                    console.log('Validation error:', err);
                    res.send('Validation error:', err);
                } else {
                    // insert game state to the database
                    collection.insertOne(gameState, (err, result) => {
                        if (err) {
                            console.log('Error inserting to database:', err);
                            res.send('Error inserting to database:', err);
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

// Connect a player
router.post('/game/', (req, res) => {
    res.json({success: true});
});

// Make a move on the game board
router.put('/game', (req, res) => {
    res.json({success: true});
});

// Ping backend to keep connection alive
router.post('/ping/', (req, res) => {
    res.json({success: true});
});

// Send a chat message
router.post('/chat', (req, res) => {
    res.json({success: true});
});

module.exports = router;
