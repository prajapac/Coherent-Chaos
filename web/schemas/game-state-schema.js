
const { CELL_EMPTY, CELL_PLAYER_1, CELL_PLAYER_2, CELL_OUT_OF_PLAY, PLAYER_1, PLAYER_2 } = require('../constants');

const joi = require('joi');
const idGenerator = require('../utility/id-generator');

const schema = joi.object().keys({
    _id: joi.any(),
    game_id: joi.string().alphanum().length(idGenerator.ID_LENGTH).required(),
    board_state: joi.array().items(
        joi.array().items(joi.number().valid(CELL_OUT_OF_PLAY, CELL_EMPTY, CELL_PLAYER_1, CELL_PLAYER_2)).length(6).required(),
        joi.array().items(joi.number().valid(CELL_OUT_OF_PLAY, CELL_EMPTY, CELL_PLAYER_1, CELL_PLAYER_2)).length(7).required(),
        joi.array().items(joi.number().valid(CELL_OUT_OF_PLAY, CELL_EMPTY, CELL_PLAYER_1, CELL_PLAYER_2)).length(8).required(),
        joi.array().items(joi.number().valid(CELL_OUT_OF_PLAY, CELL_EMPTY, CELL_PLAYER_1, CELL_PLAYER_2)).length(9).required(),
        joi.array().items(joi.number().valid(CELL_OUT_OF_PLAY, CELL_EMPTY, CELL_PLAYER_1, CELL_PLAYER_2)).length(10).required(),
        joi.array().items(joi.number().valid(CELL_OUT_OF_PLAY, CELL_EMPTY, CELL_PLAYER_1, CELL_PLAYER_2)).length(11).required(),
        joi.array().items(joi.number().valid(CELL_OUT_OF_PLAY, CELL_EMPTY, CELL_PLAYER_1, CELL_PLAYER_2)).length(10).required(),
        joi.array().items(joi.number().valid(CELL_OUT_OF_PLAY, CELL_EMPTY, CELL_PLAYER_1, CELL_PLAYER_2)).length(9).required(),
        joi.array().items(joi.number().valid(CELL_OUT_OF_PLAY, CELL_EMPTY, CELL_PLAYER_1, CELL_PLAYER_2)).length(8).required(),
        joi.array().items(joi.number().valid(CELL_OUT_OF_PLAY, CELL_EMPTY, CELL_PLAYER_1, CELL_PLAYER_2)).length(7).required(),
        joi.array().items(joi.number().valid(CELL_OUT_OF_PLAY, CELL_EMPTY, CELL_PLAYER_1, CELL_PLAYER_2)).length(6).required()
    ).required(),
    player1_last_message: joi.string(),
    player2_last_message: joi.string(),
    player1_token: joi.string().allow('').alphanum().length(idGenerator.PLAYER_TOKEN_LENGTH),
    player2_token: joi.string().allow('').alphanum().length(idGenerator.PLAYER_TOKEN_LENGTH),
    player1_last_ping: joi.date().timestamp(),
    player2_last_ping: joi.date().timestamp(),
    whose_turn: joi.number().valid(PLAYER_1, PLAYER_2),
    num_turns: joi.number().integer().min(0),
});

module.exports = schema;
