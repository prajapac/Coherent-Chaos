const joi = require('joi');
const idGenerator = require('../utilities/idgenerator');

const schema = joi.object().keys({
    game_id: joi.string().alphanum().length(idGenerator.ID_LENGTH).required(),
    player1_token: joi.string().alphanum().length(idGenerator.PLAYER_TOKEN_LENGTH).required(),
    player2_token: joi.string().alphanum().length(idGenerator.PLAYER_TOKEN_LENGTH).required(),
    board_state: joi.array().items(
        joi.array().items(joi.number().valid(-1, 0, 1, 2)).length(6).required(),
        joi.array().items(joi.number().valid(-1, 0, 1, 2)).length(7).required(),
        joi.array().items(joi.number().valid(-1, 0, 1, 2)).length(8).required(),
        joi.array().items(joi.number().valid(-1, 0, 1, 2)).length(9).required(),
        joi.array().items(joi.number().valid(-1, 0, 1, 2)).length(10).required(),
        joi.array().items(joi.number().valid(-1, 0, 1, 2)).length(11).required(),
        joi.array().items(joi.number().valid(-1, 0, 1, 2)).length(10).required(),
        joi.array().items(joi.number().valid(-1, 0, 1, 2)).length(9).required(),
        joi.array().items(joi.number().valid(-1, 0, 1, 2)).length(8).required(),
        joi.array().items(joi.number().valid(-1, 0, 1, 2)).length(7).required(),
        joi.array().items(joi.number().valid(-1, 0, 1, 2)).length(6).required()
    ).required(),
    player1_last_message: joi.string(),
    player2_last_message: joi.string(),
    player1_last_ping: joi.date().timestamp(),
    player2_last_ping: joi.date().timestamp(),
    whos_turn: joi.string().alphanum().length(idGenerator.PLAYER_TOKEN_LENGTH),
    num_turns: joi.number().integer().min(0),
});

module.exports = schema;
