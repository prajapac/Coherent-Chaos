const { CELL_EMPTY,
        CELL_OUT_OF_PLAY,
        DECAY_TURN_NUMBER,
        PLAYER_1,
        PLAYER_2,
        CELL_PLAYER_1,
        CELL_PLAYER_2} = require('../../constants');

const assert = require('chai').assert;
const generateDecay = require('../../utility/game-board-decay');
const generateInitBoard = require('../../utility/game-board-generator');

const idGenerator = require('../../utility/id-generator');
const generateGameID = idGenerator.generateGameID();
const generatePlayerToken = idGenerator.generatePlayerToken();

const gameBoardManipulator = require('../../utility/game-board-manipulator');
const checkForWinner = gameBoardManipulator.checkForWinner;
const makeMove = gameBoardManipulator.makeMove;

let gameState;

beforeEach(() => {
    gameState = {
        game_id: 'TEST',
        board_state: [
            [CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1],
            [CELL_EMPTY, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_EMPTY],
            [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
            [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
            [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
            [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
            [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
            [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
            [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
            [CELL_EMPTY, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_EMPTY],
            [CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2],
        ],
        num_turns: DECAY_TURN_NUMBER,
        whose_turn: PLAYER_1,
        player1_token: 'WNUTOD3T',
        player1_last_ping: 0,
        player2_token: '',
        player2_last_ping: 0,
        winner: null
    }
});

describe('Common Utilities', () => {
    describe('game-board-decay', () => {
        it('Should set outer cells of game board state to CELL_OUT_OF_PLAY', ()=> {

            // Setup test variables
            let decayGameState = {
                game_id: 'TEST',
                board_state: [
                    [CELL_OUT_OF_PLAY,CELL_OUT_OF_PLAY,CELL_OUT_OF_PLAY,CELL_OUT_OF_PLAY,CELL_OUT_OF_PLAY,CELL_OUT_OF_PLAY],
                    [CELL_OUT_OF_PLAY,CELL_PLAYER_1,CELL_PLAYER_1,CELL_PLAYER_1,CELL_PLAYER_1,CELL_PLAYER_1,CELL_OUT_OF_PLAY],
                    [CELL_OUT_OF_PLAY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_OUT_OF_PLAY],
                    [CELL_OUT_OF_PLAY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_OUT_OF_PLAY],
                    [CELL_OUT_OF_PLAY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_OUT_OF_PLAY],
                    [CELL_OUT_OF_PLAY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_OUT_OF_PLAY],
                    [CELL_OUT_OF_PLAY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_OUT_OF_PLAY],
                    [CELL_OUT_OF_PLAY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_OUT_OF_PLAY],
                    [CELL_OUT_OF_PLAY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_EMPTY,CELL_OUT_OF_PLAY],
                    [CELL_OUT_OF_PLAY,CELL_PLAYER_2,CELL_PLAYER_2,CELL_PLAYER_2,CELL_PLAYER_2,CELL_PLAYER_2,CELL_OUT_OF_PLAY],
                    [CELL_OUT_OF_PLAY,CELL_OUT_OF_PLAY,CELL_OUT_OF_PLAY,CELL_OUT_OF_PLAY,CELL_OUT_OF_PLAY,CELL_OUT_OF_PLAY]
                ],
                num_turns: DECAY_TURN_NUMBER,
                whose_turn: PLAYER_1,
                player1_token: 'WNUTOD3T',
                player1_last_ping: 0,
                player2_token: '',
                player2_last_ping: 0,
                winner: null
            }

            gameState.board_state = generateDecay(gameState.board_state, gameState.num_turns);

            // Test Gameboard
            assert.isArray(gameState.board_state, 'Returned GameState is not in array format');
            assert.deepEqual(gameState.board_state, decayGameState.board_state, 'GameState Array values dont match');

            // Test other gameState properties for unexpected changes
            assert.strictEqual(gameState.game_id, decayGameState.game_id, 'Unexpected value change in game_id');
            assert.strictEqual(gameState.num_turns, decayGameState.num_turns, 'Unexpected value change in num_turns');
            assert.strictEqual(gameState.whose_turn, decayGameState.whose_turn, 'Unexpected value change in whose_turn');
            assert.strictEqual(gameState.player1_token, decayGameState.player1_token, 'Unexpected value change in player1_token');
            assert.strictEqual(gameState.player1_last_ping, decayGameState.player1_last_ping, 'Unexpected value change in player1_last_ping');
            assert.strictEqual(gameState.player2_token, decayGameState.player2_token, 'Unexpected value change in player2_token');
            assert.strictEqual(gameState.player2_last_ping, decayGameState.player2_last_ping, 'Unexpected value change in player2_last_ping');
            assert.strictEqual(gameState.winner, decayGameState.winner, 'Unexpected value change in winner');
        });
    });
    describe('game-board-generator', () => {
        it('Should initialize a default game board state', ()=> {
            // Setup test variables
            let initalGameState = {
                game_id: 'TEST',
                board_state: [
                    [CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1],
                    [CELL_EMPTY, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_EMPTY],
                    [CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2],
                ],
                num_turns: DECAY_TURN_NUMBER,
                whose_turn: PLAYER_1,
                player1_token: 'WNUTOD3T',
                player1_last_ping: 0,
                player2_token: '',
                player2_last_ping: 0,
                winner: null
            };

            gameState.board_state = generateInitBoard(gameState.board_state, gameState.num_turns);

            // Test Gameboard
            assert.isArray(gameState.board_state, 'Returned GameState is not in array format');
            assert.deepEqual(gameState.board_state, initalGameState.board_state, 'GameState Array values dont match');

            // Test other gameState properties for unexpected changes
            assert.strictEqual(gameState.game_id, initalGameState.game_id, 'Unexpected value change in game_id');
            assert.strictEqual(gameState.num_turns, initalGameState.num_turns, 'Unexpected value change in num_turns');
            assert.strictEqual(gameState.whose_turn, initalGameState.whose_turn, 'Unexpected value change in whose_turn');
            assert.strictEqual(gameState.player1_token, initalGameState.player1_token, 'Unexpected value change in player1_token');
            assert.strictEqual(gameState.player1_last_ping, initalGameState.player1_last_ping, 'Unexpected value change in player1_last_ping');
            assert.strictEqual(gameState.player2_token, initalGameState.player2_token, 'Unexpected value change in player2_token');
            assert.strictEqual(gameState.player2_last_ping, initalGameState.player2_last_ping, 'Unexpected value change in player2_last_ping');
            assert.strictEqual(gameState.winner, initalGameState.winner, 'Unexpected value change in winner');
        });
    });
    describe('game-board-manipulator', () => {
        describe('checkForWinner', () => {
            it('Should allow checks for winners based on game state', () => {
                // Setup test variables
                let winnerGameState = [
                    [CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY],
                    [CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY],
                    [CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY],
                    [CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY],
                    [CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY],
                    [CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_EMPTY, CELL_PLAYER_1, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY],
                    [CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY],
                    [CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY],
                    [CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY],
                    [CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY],
                    [CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY, CELL_OUT_OF_PLAY],
                ];
                let notWinnerGameState = [
                    [CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1],
                    [CELL_EMPTY, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_EMPTY],
                    [CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2],
                ];


                let isWinner = checkForWinner(winnerGameState);
                let notWinner = checkForWinner(notWinnerGameState);

                // Test checkForWinner
                assert.isNotNull(isWinner, 'No winner was found');
                assert.strictEqual(isWinner, PLAYER_1, 'Incorrect player was deemed winner');
                assert.isNull(notWinner, 'Winner was found when none should be');

            });
        });

        describe('makeMove', () => {
            it('Should allow player moves based on given move user inputs', () => {
                // Setup test Variables for player 1 test
                let validMoveP1 = {
                    selectedCell: {
                        rowIndex: 1,
                        columnIndex: 1
                    },
                    targetCell: {
                        rowIndex: 2,
                        columnIndex: 2
                    }
                };

                let invalidMoveP1 = {
                    selectedCell: {
                        rowIndex: 1,
                        columnIndex: 1
                    },
                    targetCell: {
                        rowIndex: 0,
                        columnIndex: 0
                    }
                };

                let validGameBoardP1 = [
                    [CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1],
                    [CELL_EMPTY, CELL_EMPTY, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_PLAYER_1, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_EMPTY],
                    [CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2],
                ];

                let validMovementP1 = makeMove(validMoveP1, gameState.board_state, PLAYER_1);
                let invalidMovementP1 = makeMove(invalidMoveP1, gameState.board_state, PLAYER_1);

                // Test makeMove player1
                assert.isNotNull(validMovementP1, 'Movement reported as invalid when it should be valid');
                assert.deepEqual(validMovementP1, validGameBoardP1, 'Incorrect movement was made');

                assert.isNull(invalidMovementP1, 'Movement reported as valid when it should be invalid');


                // Setup test Variables for player 2 test
                let validMoveP2 = {
                    selectedCell: {
                        rowIndex: 9,
                        columnIndex: 1
                    },
                    targetCell: {
                        rowIndex: 8,
                        columnIndex: 2
                    }
                };

                let invalidMoveP2 = {
                    selectedCell: {
                        rowIndex: 10,
                        columnIndex: 1
                    },
                    targetCell: {
                        rowIndex: 10,
                        columnIndex: 2
                    }
                };

                let validGameBoardP2 = [
                    [CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1],
                    [CELL_EMPTY, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_PLAYER_1, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_PLAYER_2, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
                    [CELL_EMPTY, CELL_EMPTY, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_EMPTY],
                    [CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2, CELL_PLAYER_2],
                ];

                let validMovementP2 = makeMove(validMoveP2, gameState.board_state, PLAYER_2);
                let invalidMovementP2 = makeMove(invalidMoveP2, gameState.board_state, PLAYER_2);

                // Test makeMove player2
                assert.isNotNull(validMovementP2, 'Movement reported as invalid when it should be valid');
                assert.deepEqual(validMovementP2, validGameBoardP2, 'Incorrect movement was made');

                assert.isNull(invalidMovementP2, 'Movement reported as valid when it should be invalid');

            });
        });
    });
    describe('id-generator', () => {
        describe('generateGameID', () => {
            it('Should allow the generation of a valid game id on call', () => {
                // Setup test variables
                let gameId = generateGameID;

                // Test validity of id formats
                assert.isString(gameId, 'Returned gameId in incorrect format');
                assert.lengthOf(gameId, 4, 'String gameId has incorrect length');
            });
        });


        describe('generatePlayerToken', () => {
            it('Should allow the generation of a valid player token on call', () => {
                // Setup test variables
                let playerToken = generatePlayerToken;

                // Test validity of token formats
                assert.isString(playerToken, 'Returned playerToken in incorrect format');
                assert.lengthOf(playerToken, 8, 'String playerToken has incorrect length');
            });
        });
    });
});
