const express = require('express');
const router = express.Router();
const joi = require('joi');
const gameStateSchema = require('../schemas/game-state-schema');
const bodyParser = require('body-parser');
const idGenerator = require('../utility/id-generator');
const generateInitBoard = require('../utility/game-board-generator');
const makeMove = require('../utility/game-board-manipulator').makeMove;

const constants = require('../constants');
const config = require('../constants/config');

const getDB = require('../utility/db').getDB;
const log = require('../utility/logger')('routes/api');

// Middleware to parse the POST data of req bodies
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// API root
router.get('/', (req, res) => {
    res.json({success: true});
});

// Create game
router.post('/game', async (req, res) => {
    const DBConnection = getDB();
    const db = DBConnection.db(config.DB_NAME);
    const collection = db.collection(config.DB_GAME_TABLE);

    let gameID = null;
    let alreadyExists = true;

    // Attempts at generating a random gameID that doesn't already exist in the DB
    let attempts = 0;
    do {
        if (attempts > config.MAX_GAME_ID_RETRIES) {
            log('Reached max attempts at generating random gameID');
            res.status(500).send({ 'failure': true, 'message': 'Reached max attempts at generating random gameID'});
            return;
        }

        // Generate a game ID, verify gameID doesn't already exist in the database
        gameID = idGenerator.generateGameID();

        let err, result = await collection.findOne({game_id: gameID});
        if (err) {
            log(('Error querying by gameID generated:', err));
            res.status(500).send({ 'failure': true, 'message': 'Error querying by gameID generated', 'error': err });
            return;
        }
        else if (result) {
            log(('gameID generated already exists', result));
        }
        else {
            alreadyExists = false;
        }

        attempts++;
    } while (alreadyExists);

    // Generate initial game state/board
    let initGameBoard = generateInitBoard();

    // Assemble game state document for storage in database
    const newState = {
        game_id: gameID,
        board_state: initGameBoard,
        num_turns: 0,
        whose_turn: constants.PLAYER_1,
        player1_token: idGenerator.generatePlayerToken(),
        player1_last_ping: Date.now(),
        player2_token: '',
        player2_last_ping: 0
    };

    // Validate game state
    joi.validate(newState, gameStateSchema, (err, value) => {
        if (err) {
            log(('Game state validation failure:', err));
            res.status(500).send({ 'failure': true, 'message': 'Failed to validate game:', 'error': err.details.message });

        } else {
            // Insert game state to the database and send relevant fields
            collection.insertOne(newState, (err, result) => {
                if (err) {
                    log(('Failed to create game:', err));
                    res.status(500).send({ 'failure': true, 'message': 'Failed to create game', 'error': err.details.message });

                } else {
                    log(`Created game with _id: ${result.insertedId}`);
                    res.send({
                        game_id: value.game_id,
                        board_state: value.board_state,
                        num_turns: value.num_turns,
                        whose_turn: value.whose_turn,
                        token: value.player1_token
                    });
                }
            });
        }
    });
});

// Get game state
router.get('/game/:id/', async (req, res) => {
    const DBConnection = getDB();
    const db = DBConnection.db(config.DB_NAME);
    const collection = db.collection(config.DB_GAME_TABLE);

    let gameID = req.params.id;
    let time = Date.now();

    // Get game state for game with gameID
    let err, gameState = await collection.findOne({game_id: gameID});

    if (err) {
        log(('Error querying by gameID generated:', err));
        res.send({ 'failure': true, 'message': 'Error querying by gameID generated', 'error': err });
    } else if (gameState) {
        // Add player activity data
        gameState.player_1_active = time - gameState.player1_last_ping < config.TOKEN_EXPIRY_MILLISECONDS;
        gameState.player_2_active = time - gameState.player2_last_ping < config.TOKEN_EXPIRY_MILLISECONDS;
        // Remove private fields from game state to send to player
        delete gameState.player1_token;
        delete gameState.player2_token;
        delete gameState.player1_last_ping;
        delete gameState.player2_last_ping;
        res.send(gameState);
    } else {
        log(('gameID does not exist', gameID));
        res.send({ 'failure': true, 'message': 'gameID does not exist', 'gameID': gameID });
    }
});

// Connect player
router.post('/game/:id/', async (req, res) => {
    const DBConnection = getDB();
    const db = DBConnection.db(config.DB_NAME);
    const collection = db.collection(config.DB_GAME_TABLE);

    let gameID = req.params.id;
    let playerChoice = parseInt(req.body.playerChoice);
    let newToken = null;

    // Get game state for game with gameID
    let err, gameState = await collection.findOne({game_id: gameID});

    if (err) {
        log(('Error querying by gameID generated:', err));
        res.send({ 'failure': true, 'message': 'Error querying by gameID', 'error': err });
        return;
    } else if (gameState) {
        let time = Date.now();

        if (playerChoice === constants.PLAYER_1 && time - gameState.player1_last_ping >= config.TOKEN_EXPIRY_MILLISECONDS) { // Token expired
            newToken = idGenerator.generatePlayerToken();
            gameState.player1_token = newToken;
            gameState.player1_last_ping = Date.now();
        } else if (playerChoice === constants.PLAYER_2 && time - gameState.player2_last_ping >= config.TOKEN_EXPIRY_MILLISECONDS) { // Token expired
            newToken = idGenerator.generatePlayerToken();
            gameState.player2_token = newToken;
            gameState.player2_last_ping = Date.now();
        } else if (playerChoice !== constants.PLAYER_1 && playerChoice !== constants.PLAYER_2) {
            res.send({ 'failure': true, message: 'Invalid player choice or player still connected', gameID: gameID, playerChoice: playerChoice });
            return;
        } else {
            res.send({ 'failure': true, message: 'Game is full', gameID: gameID });
            return;
        }
    } else {
        log( ('Game does not exist', gameID));
        res.send({ 'failure': true, 'message': 'gameID does not exist', 'gameID': gameID });
        return;
    }

    // Validate gamestate
    joi.validate(gameState, gameStateSchema, (err, value)=> {
        if (err) {
            log(('Game state validation failure:', err));
            res.send({ 'failure': true, 'message': 'Game state validation failure', 'error': err });
        } else {
            // update game state in the database
            collection.updateOne({game_id: gameID}, {$set: gameState}, (err, result) => { // eslint-disable-line no-unused-vars
                if (err) {
                    log(('Database insert failure:', err));
                    res.send({ 'failure': true, 'message': 'Database insert failure', 'error': err });
                } else {
                    log((`Successfully updated item with _id: ${value._id}`));
                    res.send({token: newToken});
                }
            });
        }
    });
});

// Ping to keep connection alive
router.patch('/game/:id/', async (req, res) => {
    const DBConnection = getDB();
    const db = DBConnection.db(config.DB_NAME);
    const collection = db.collection(config.DB_GAME_TABLE);

    let playerToken;
    let gameID = req.params.id;
    let time = Date.now();

    if (req.body.token) {
        playerToken = req.body.token;
    } else {
        log('Missing playerToken or Improper POST body format');
        res.send({ 'failure': true, 'message': 'Missing playerToken or improper POST body format' });
        return;
    }

    // Get game state for game with gameID
    let err, gameState = await collection.findOne({game_id: gameID});

    if (err) {
        log(('Error querying by gameID:', err));
        res.send({ 'failure': true, 'message': 'Error querying by gameID generated', 'error': err });
        return;
    } else if (gameState) {
        if (playerToken === gameState.player1_token && time - gameState.player1_last_ping < config.TOKEN_EXPIRY_MILLISECONDS) { // Token not expired
            // Update player 1 last pinged time
            gameState.player1_last_ping = time;
        } else if (playerToken === gameState.player2_token && time - gameState.player2_last_ping < config.TOKEN_EXPIRY_MILLISECONDS) { // Token not expired
            // Update player 2 last pinged time
            gameState.player2_last_ping = time;
        } else {
            log(('playerToken is invalid', gameID));
            res.send({ 'failure': true, 'message': 'playerToken is invalid', 'playerToken': playerToken });
            return;
        }
    } else {
        log(('gameID does not exist', gameID));
        res.send({ 'failure': true, 'message': 'gameID does not exist', 'gameID': gameID });
        return;
    }

    // Validate gamestate using Joi
    joi.validate(gameState, gameStateSchema, (err, value)=> {
        if (err) {
            log(('Game state validation failure:', err));
            res.send({ 'failure': true, 'message': 'Game state validation failure', 'error': err });
        } else {
            // update game state in the database
            collection.updateOne({game_id: gameID}, {$set: gameState}, (err, result) => { // eslint-disable-line no-unused-vars
                if (err) {
                    log(('Database insert failure:', err));
                    res.send({ 'failure': true, 'message': 'Database insert failure', 'error': err });
                } else {
                    log((`Successfully updated item with _id: ${value._id}`));
                    // Add player activity data
                    gameState.player_1_active = time - gameState.player1_last_ping < config.TOKEN_EXPIRY_MILLISECONDS;
                    gameState.player_2_active = time - gameState.player2_last_ping < config.TOKEN_EXPIRY_MILLISECONDS;
                    // Remove unnecessary fields from game state to send to player
                    delete value.player1_token;
                    delete value.player2_token;
                    delete value.player1_last_ping;
                    delete value.player2_last_ping;
                    delete value._id;
                    res.send(value);
                }
            });
        }
    });
});

// Make a move on game board
router.post('/game/:id/board/', async (req, res) => {
    const DBConnection = getDB();
    const db = DBConnection.db(config.DB_NAME);
    const collection = db.collection(config.DB_GAME_TABLE);

    let playerToken;
    let gameID = req.params.id;
    let selectedPlayer;
    let time = Date.now();

    if (req.body.token) {
        playerToken = req.body.token;
    } else {
        log('Missing playerToken or Improper POST body format');
        res.send({ 'failure': true, 'message': 'Missing playerToken or improper POST body format' });
        return;
    }

    // Get game state for game with gameID
    let err, gameState = await collection.findOne({game_id: gameID});

    if (err) {
        log(('Error querying by gameID:', err));
        res.send({ 'failure': true, 'message': 'Error querying by gameID generated', 'error': err });
        return;
    } else if (gameState) {
        if (playerToken === gameState.player1_token && time - gameState.player1_last_ping < config.TOKEN_EXPIRY_MILLISECONDS) { // Token not expired
            // Update player 1 last pinged time
            gameState.player1_last_ping = time;
            selectedPlayer = constants.PLAYER_1;
        } else if (playerToken === gameState.player2_token && time - gameState.player2_last_ping < config.TOKEN_EXPIRY_MILLISECONDS) { // Token not expired
            // Update player 2 last pinged time
            gameState.player2_last_ping = time;
            selectedPlayer = constants.PLAYER_2;
        } else {
            log(('playerToken is invalid', gameID));
            res.send({ 'failure': true, 'message': 'playerToken is invalid', 'playerToken': playerToken });
            return;
        }
    } else {
        log(('gameID does not exist', gameID));
        res.send({ 'failure': true, 'message': 'gameID does not exist', 'gameID': gameID });
        return;
    }

    // Is it our turn?
    if (!(selectedPlayer === gameState.whose_turn)) {
        log(('It is not your turn', gameID));
        res.send({ 'failure': true, 'message': 'It is not your turn', 'gameID': gameID });
        return;
    }

    // Do the move
    if (req.body.move) {
        gameState.board_state = makeMove(req.body.move, gameState.board_state, selectedPlayer);

        if (gameState.board_state == null) {
            log(('Invalid move instructions', gameID));
            res.send({ 'failure': true, 'message': 'Invalid move instructions' });
            return;
        }
    } else {
        log(('Missing move instructions', gameID));
        res.send({ 'failure': true, 'message': 'Missing move instructions' });
        return;
    }

    // Update whose turn
    gameState.whose_turn = selectedPlayer === constants.PLAYER_1 ? constants.PLAYER_2 : constants.PLAYER_1;

    // Validate gamestate using Joi
    joi.validate(gameState, gameStateSchema, (err, value)=> {
        if (err) {
            log(('Game state validation failure:', err));
            res.send({ 'failure': true, 'message': 'Game state validation failure', 'error': err });
        } else {
            // update game state in the database
            collection.updateOne({game_id: gameID}, {$set: gameState}, (err, result) => { // eslint-disable-line no-unused-vars
                if (err) {
                    log(('Database insert failure:', err));
                    res.send({ 'failure': true, 'message': 'Database insert failure', 'error': err });
                } else {
                    log((`Successfully updated item with _id: ${value._id}`));
                    // Add player activity data
                    gameState.player_1_active = time - gameState.player1_last_ping < config.TOKEN_EXPIRY_MILLISECONDS;
                    gameState.player_2_active = time - gameState.player2_last_ping < config.TOKEN_EXPIRY_MILLISECONDS;
                    // Remove unnecessary fields from game state to send to player
                    delete value.player1_token;
                    delete value.player2_token;
                    delete value.player1_last_ping;
                    delete value.player2_last_ping;
                    delete value._id;
                    res.send(value);
                }
            });
        }
    });
});

module.exports = router;
