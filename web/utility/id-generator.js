const ID_LENGTH = 4;
const PLAYER_TOKEN_LENGTH = 8;

const generateGameID = function() {
    // base 36 = numbers(10[0-9]) + letters(26[A-Z])
    // substr(2, ID_LENGTH) strips away '0.' e.g. to get 1052635 from 0.1052635
    return Math.random().toString(36).substr(2, ID_LENGTH).toUpperCase();
};

// Player Token(s) required for integrity checks
const generatePlayerToken = function() {
    // base 36 = numbers(10[0-9]) + letters(26[A-Z])
    // substr(2, PLAYER_TOKEN_LENGTH) strips away '0.' e.g. to get 1052635 from 0.1052635
    return Math.random().toString(36).substr(2, PLAYER_TOKEN_LENGTH).toUpperCase();
};

module.exports = {
    generateGameID,
    generatePlayerToken,
    ID_LENGTH,
    PLAYER_TOKEN_LENGTH,
};
