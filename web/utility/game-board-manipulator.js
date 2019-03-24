const constants = require('../constants');

// Return the coordinates of the cell flipped over the pivotCell from sourceCell
// Returns null if arguments are invalid or cell is outside board
// Cell: {
//  rowIndex,
//  columnIndex,
//  state
// }
const getOppositeCell = (boardState, sourceCell, pivotCell) => {
    if (!boardState || !sourceCell || !pivotCell) { return null; }

    let targetCell = {};
    let columnDistance = pivotCell.columnIndex - sourceCell.columnIndex;
    let rowDistance = pivotCell.rowIndex - sourceCell.rowIndex;

    if (pivotCell.rowIndex === sourceCell.rowIndex) { // Same row
        targetCell.rowIndex = pivotCell.rowIndex;
        targetCell.columnIndex = pivotCell.columnIndex + columnDistance;

    } else {
        targetCell.rowIndex = pivotCell.rowIndex + rowDistance;

        // Special case, crossing center row of hexagon
        if ((typeof boardState[pivotCell.rowIndex + 1] !== 'undefined' && boardState[pivotCell.rowIndex].length > boardState[pivotCell.rowIndex + 1].length) &&
            (typeof boardState[pivotCell.rowIndex - 1] !== 'undefined' && boardState[pivotCell.rowIndex].length > boardState[pivotCell.rowIndex - 1].length)) {
            targetCell.columnIndex = columnDistance !== 0
                ? pivotCell.columnIndex
                : pivotCell.columnIndex - Math.abs(rowDistance);

        } else {
            targetCell.columnIndex = pivotCell.columnIndex + columnDistance;
        }
    }

    if (typeof boardState[targetCell.rowIndex] !== 'undefined' && typeof boardState[targetCell.rowIndex][targetCell.columnIndex] !== 'undefined') {
        targetCell.state = boardState[targetCell.rowIndex][targetCell.columnIndex];

        return targetCell;
    } else {
        return null;
    }
};

// Return if testCell is beside sourceCell
// Cell: {
//  rowIndex,
//  columnIndex,
//  state
// }
const isCellAdjacent = (boardState, sourceCell, testCell) => {
    if (!boardState || !sourceCell || !testCell) { return false; }

    const columnIndexOffset = testCell.columnIndex - sourceCell.columnIndex;
    const rowIndexOffset = testCell.rowIndex - sourceCell.rowIndex;
    const cellRowShift = boardState[testCell.rowIndex].length - boardState[sourceCell.rowIndex].length;

    switch (rowIndexOffset * rowIndexOffset) {
        case 0: // Same row
            return columnIndexOffset * columnIndexOffset === 1;
        case 1: // Row above or below
            return testCell.columnIndex === sourceCell.columnIndex || testCell.columnIndex === sourceCell.columnIndex + cellRowShift;
        default:
            return false;
    }
};

const isCellEnemy = (cellState, player) => {
    return (cellState === constants.CELL_PLAYER_1 && player === constants.PLAYER_2) || (cellState === constants.CELL_PLAYER_2 && player === constants.PLAYER_1);
};

// Convert simple board state array to object array for easier manipulation
const expandBoardStateToCellObjects = (boardState, selectedCell, selectedPlayer) => {
    let hoppables = [];
    let board = boardState.map((row, rowIndex) => {
        return row.map((cellState, columnIndex) => {
            let currentCell = {
                rowIndex: rowIndex,
                columnIndex: columnIndex,
                state: cellState
            };

            if (isCellEnemy(cellState, selectedPlayer) && isCellAdjacent(boardState, currentCell, selectedCell)) {
                hoppables.push(currentCell);
            }

            return currentCell;
        });
    });

    hoppables.forEach((cell) => {
        let hopToCell = getOppositeCell(boardState, selectedCell, cell);

        if (hopToCell) {
            board[hopToCell.rowIndex][hopToCell.columnIndex].visitable = hopToCell.state === constants.CELL_EMPTY;
            board[hopToCell.rowIndex][hopToCell.columnIndex].hoppedCell = cell;
        }
    });

    return board;
};

const collapseBoardStateToEnum = (boardState) => {
    return boardState.map((row,) => (
        row.map((cell) => cell.state)
    ));
};

// Determine if the board has only one player left
// Returns null if no winner, PLAYER_1, or PLAYER_2
const checkForWinner = (boardState) => {
    let havePlayer1Cell = false;
    let havePlayer2Cell = false;

    boardState.forEach(row => {
        row.forEach((cellState) => {
            switch (cellState) {
                case constants.CELL_PLAYER_1:
                    havePlayer1Cell = true;
                    break;
                case constants.CELL_PLAYER_2:
                    havePlayer2Cell = true;
                    break;
            }
        });
    });

    if (!(havePlayer1Cell && havePlayer2Cell)) {
        if (havePlayer1Cell) {
            return constants.PLAYER_1;
        } else if (havePlayer2Cell) {
            return constants.PLAYER_2;
        }
    }

    return null;
};

/*
Return an adjusted board state by a move
Return null if move is not valid
move = {
    selectedCell: {
        rowIndex: selectedCell.rowIndex,
        columnIndex: selectedCell.columnIndex
    },
    targetCell: {
        rowIndex: targetCell.rowIndex,
        columnIndex: targetCell.columnIndex
    },
    [optional] hoppedCell: {
        rowIndex: targetCell.hoppedCell.rowIndex,
        columnIndex: targetCell.hoppedCell.columnIndex
    }
}
 */
const makeMove = function(move, boardState, selectedPlayer) {
    if (!(move && boardState && selectedPlayer)) { return null; }

    let board = expandBoardStateToCellObjects(boardState, move.selectedCell, selectedPlayer);

    // Verify selected and target exist
    if (!(move.selectedCell || move.targetCell)) { return null; }

    // Verify the selected cell matches the real board state
    {
        let isSelectedPlayerCellValid = selectedPlayer === constants.PLAYER_1 || selectedPlayer === constants.PLAYER_2;
        let selectedCellState = (selectedPlayer === constants.PLAYER_1)
            ? constants.CELL_PLAYER_1
            : constants.CELL_PLAYER_2;
        let realBoardCell = board[move.selectedCell.rowIndex][move.selectedCell.columnIndex] || {};

        if (!(isSelectedPlayerCellValid && realBoardCell.state === selectedCellState)) { return null; }
    }

    // Verify the target cell matches the real board state
    {
        let realBoardCell = board[move.targetCell.rowIndex][move.targetCell.columnIndex] || {};

        if (!(realBoardCell.state === constants.CELL_EMPTY)) { return null; }
    }

    // If there is a hop, verify it and the target cell is the result of finding the opposite cell of selectedCell over the hopped cell
    if (move.hoppedCell) {
        // Verify the hopped cell matches the real board state
        let realBoardCell = board[move.hoppedCell.rowIndex][move.hoppedCell.columnIndex] || {};
        let expectedHoppedCellState = (selectedPlayer === constants.PLAYER_1)
            ? constants.CELL_PLAYER_2
            : constants.CELL_PLAYER_1;

        if (!(realBoardCell.state === expectedHoppedCellState)) { return null; }

        // Verify the target cell is opposite the hopped cell
        let realOppositeCell = getOppositeCell(board, move.selectedCell, move.hoppedCell);
        if (!realOppositeCell) { return null; }
        if (realOppositeCell.rowIndex !== move.targetCell.rowIndex || realOppositeCell.columnIndex !== move.targetCell.columnIndex) {
            return null;
        }

        // Verify the hopped cell is adjacent
        if (!isCellAdjacent(board, move.selectedCell, move.hoppedCell)) { return null; }
    } else {
        // Verify the target cell is adjacent
        if (!isCellAdjacent(board, move.selectedCell, move.targetCell)) { return null; }
    }

    // Do the move
    board[move.targetCell.rowIndex][move.targetCell.columnIndex].state = board[move.selectedCell.rowIndex][move.selectedCell.columnIndex].state;
    board[move.selectedCell.rowIndex][move.selectedCell.columnIndex].state = constants.CELL_EMPTY;

    if (move.hoppedCell) {
        board[move.hoppedCell.rowIndex][move.hoppedCell.columnIndex].state = constants.CELL_EMPTY;
    }

    return collapseBoardStateToEnum(board);
};

module.exports = {
    makeMove,
    checkForWinner
};
