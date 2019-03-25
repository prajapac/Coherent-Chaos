const { CELL_OUT_OF_PLAY, DECAY_TURN_NUMBER } = require('../constants'); // eslint-disable-line no-unused-vars

const generateDecay = function(boardState, numTurns) {

    if (!boardState) { return null; }

    let cellFound = false;
    let decayNum = numTurns/DECAY_TURN_NUMBER;

    boardState.map((row, rowIndex) => {
        cellFound = false;

        // Decay top and bottom cells within the game board
        if (rowIndex < decayNum || rowIndex === boardState.length-decayNum) {
            for (let colIndex = 0; colIndex < row.length; colIndex++) {
                row[colIndex] = CELL_OUT_OF_PLAY;
            }
        } else { // Decay left and right sided cells within the game board
            for (let colIndex = 0; colIndex < row.length && !cellFound; colIndex++) {
                if (cellFound = row[colIndex] != CELL_OUT_OF_PLAY) {
                    row[colIndex] = CELL_OUT_OF_PLAY;
                    row[row.length - 1 - colIndex] = CELL_OUT_OF_PLAY;
                }
            }
        }
    })
    return boardState;
};

module.exports = generateDecay;
