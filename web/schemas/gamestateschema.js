const Joi = require('joi');
const idGenerator = require('../utilities/idgenerator');

const schema = Joi.object().keys({
    game_id: Joi.string().alphanum().length(idGenerator.ID_LENGTH).required(),
    player1_token: Joi.string().alphanum().length(idGenerator.PLAYER_TOKEN_LENGTH).required(),
    player2_token: Joi.string().alphanum().length(idGenerator.PLAYER_TOKEN_LENGTH).required(),
    board_state: Joi.array().items(
        Joi.array().items(Joi.number().valid(-1, 0, 1, 2)).length(6).required(),
        Joi.array().items(Joi.number().valid(-1, 0, 1, 2)).length(7).required(),
        Joi.array().items(Joi.number().valid(-1, 0, 1, 2)).length(8).required(),
        Joi.array().items(Joi.number().valid(-1, 0, 1, 2)).length(9).required(),
        Joi.array().items(Joi.number().valid(-1, 0, 1, 2)).length(10).required(),
        Joi.array().items(Joi.number().valid(-1, 0, 1, 2)).length(11).required(),
        Joi.array().items(Joi.number().valid(-1, 0, 1, 2)).length(10).required(),
        Joi.array().items(Joi.number().valid(-1, 0, 1, 2)).length(9).required(),
        Joi.array().items(Joi.number().valid(-1, 0, 1, 2)).length(8).required(),
        Joi.array().items(Joi.number().valid(-1, 0, 1, 2)).length(7).required(),
        Joi.array().items(Joi.number().valid(-1, 0, 1, 2)).length(6).required()
    ).required(),
    player1_last_message: Joi.string(),
    player2_last_message: Joi.string(),
    player1_last_ping: Joi.date().timestamp(),
    player2_last_ping: Joi.date().timestamp(),
    whos_turn: Joi.string().alphanum().length(idGenerator.PLAYER_TOKEN_LENGTH),
    num_turns: Joi.number().integer().min(0),
});

module.exports = schema;
