import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Cell from 'components/Cell';

import {
    CELL_PLAYER_1 as C1,
    CELL_PLAYER_2 as C2,
    CELL_EMPTY as CE,
    CELL_OUT_OF_PLAY as COOP,
    SIZE_SMALL as SS,
    PLAYER_1,
    PLAYER_2
} from 'constants';

import './index.scss';

// Return the coordinates of the cell flipped over the pivotCell from sourceCell
// Returns null if arguments are invalid or cell is outside board
// Cell: {
//  rowIndex,
//  columnIndex,
//  state
// }
export const getOppositeCell = (boardState, sourceCell, pivotCell) => {
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
export const isCellAdjacent = (boardState, sourceCell, testCell) => {
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

// Return if sourceCell can be moved to from destCell
// Cell: {
//  rowIndex,
//  columnIndex,
//  state
// }
export const isCellVisitable = (boardState, sourceCell, destCell) => {
    if (!boardState || !sourceCell || !destCell) { return false; }

    return destCell.state === CE && isCellAdjacent(boardState, sourceCell, destCell);
};

// Convert simple board state array to object array for easier manipulation
export const expandBoardStateToCellObjects = (boardState, selectedCell, selectedPlayer) => {
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

            return {
                rowIndex: rowIndex,
                columnIndex: columnIndex,
                state: cellState,
                visitable: isCellVisitable(
                    boardState,
                    selectedCell,
                    currentCell
                ),
                selectable: isCellOurs(cellState, selectedPlayer),
                selected: selectedCell && selectedCell.rowIndex === rowIndex && selectedCell.columnIndex === columnIndex,
            }
        });
    });

    hoppables.forEach((cell) => {
        let hopToCell = getOppositeCell(boardState, selectedCell, cell);

        if (hopToCell) {
            board[hopToCell.rowIndex][hopToCell.columnIndex].visitable = hopToCell.state === CE;
            board[hopToCell.rowIndex][hopToCell.columnIndex].hoppedCell = cell;
        }
    });

    return board;
};

export const isCellOurs = (cellState, player) => {
    return (cellState === C1 && player === PLAYER_1) || (cellState === C2 && player === PLAYER_2);
};

export const isCellEnemy = (cellState, player) => {
    return (cellState === C1 && player === PLAYER_2) || (cellState === C2 && player === PLAYER_1);
};

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCell: null
        }
    }

    cellOnClick(cell) {
        if (!this.props.isOurTurn) { return; }

        if (this.state.selectedCell && this.state.selectedCell.rowIndex === cell.rowIndex && this.state.selectedCell.columnIndex === cell.columnIndex) { // If clicking on selected, deselect current cell
            this.setState({
                selectedCell: null
            });

        } else if (this.state.selectedCell && cell.state === CE && cell.visitable) { // If a cell is already selected, we're planning to move it
            this.props.moveCell(
                this.state.selectedCell,
                cell
            );
            this.setState({
                selectedCell: null
            });

        } else if (isCellOurs(cell.state, this.props.selectedPlayer)) { // Otherwise, we need to select a cell
            this.setState({
                selectedCell: cell
            });
        }
    }

    render() {
        let board = expandBoardStateToCellObjects(this.props.boardState, this.state.selectedCell, this.props.selectedPlayer);
        const classes = classNames(this.props.className, 'board');

        return (
            <div className={classes}>
                {
                    board.map((row, rowIndex) => (
                        <div key={rowIndex} className='row'>
                            {
                                row.map((cell, columnIndex) => {
                                    const cellClasses = classNames({
                                        'cell-bg': true,
                                        'visitable': cell.visitable,
                                        'selectable': cell.selectable && this.props.isOurTurn,
                                        'selected': cell.selected,
                                        'unoccupied': cell.state === CE,
                                        'player': cell.state === C1 || cell.state === C2,
                                        'out-of-play': cell.state === COOP
                                    });

                                    return (
                                        <div key={columnIndex} className='cell-container'>
                                            <Cell
                                                state={cell.state}
                                                className={cellClasses}
                                                size={SS}
                                                onClick={() => this.cellOnClick(cell)}
                                            />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    ))
                }
            </div>
        )
    }
}

Board.propTypes = {
    className: PropTypes.string,
    selectedPlayer: PropTypes.number,
    isOurTurn: PropTypes.bool,
    boardState: PropTypes.array.isRequired,
    moveCell: PropTypes.func.isRequired
};

Board.defaultProps = {
    selectedPlayer: PLAYER_1,
    isOurTurn: true,
    boardState: [
        [CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE]
    ],
    // Callback for when a move is attempted.
    // Cell: {
    //  rowIndex,
    //  columnIndex,
    //  state
    // }
    moveCell: (selectedCell, targetCell) => {
        console.log('Move', selectedCell, targetCell); //eslint-disable-line
    }
};

export default Board;
