import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Cell from 'components/Cell';

import { CELL_PLAYER_1 as C1, CELL_PLAYER_2 as C2, CELL_EMPTY as CE } from 'constants';

import './index.scss';

// Return if testCell is beside sourceCell
// Cell: {
//  rowIndex,
//  columnIndex,
//  state
// }
export const isCellAdjacent = (boardState, sourceCell, testCell) => {
    if (!sourceCell || !testCell) { return false; }

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
    if (!sourceCell || !destCell) { return false; }

    return destCell.state === CE && isCellAdjacent(boardState, sourceCell, destCell);
};

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCell: null
        }
    }

    cellOnClick(rowIndex, columnIndex) {
        const clickedCellState = this.props.boardState[rowIndex][columnIndex];

        if (this.state.selectedCell && this.state.selectedCell.rowIndex === rowIndex && this.state.selectedCell.columnIndex === columnIndex) { // If clicking on selected, deselect current cell
            this.setState({
                selectedCell: null
            });

        } else if (this.state.selectedCell && clickedCellState === CE) { // If a cell is already selected, we're planning to move it
            this.props.moveCell(
                this.state.selectedCell,
                { // Target cell
                    rowIndex: rowIndex,
                    columnIndex: columnIndex,
                    state: clickedCellState
                }
            );

        } else if (clickedCellState === C1 || clickedCellState === C2) { // Otherwise, we need to select a cell
            this.setState({
                selectedCell: {
                    rowIndex: rowIndex,
                    columnIndex: columnIndex,
                    state: clickedCellState
                }
            });
        }
    }

    render() {
        const { className, boardState } = this.props;
        const classes = classNames(className, 'board');

        return (
            <div className={classes}>
                {
                    boardState.map((row, rowIndex) => (
                        <div key={rowIndex} className='row'>
                            {
                                row.map((cellState, columnIndex) => {
                                    const cellClasses = classNames({
                                        'cell-bg': true,
                                        'visitable': isCellVisitable(
                                            boardState,
                                            this.state.selectedCell,
                                            { // Current cell
                                                rowIndex: rowIndex,
                                                columnIndex: columnIndex,
                                                state: cellState
                                            }
                                        ),
                                        'selectable': cellState === C1 || cellState === C2,
                                        'selected': this.state.selectedCell && this.state.selectedCell.rowIndex === rowIndex && this.state.selectedCell.columnIndex === columnIndex
                                    });

                                    return (
                                        <div key={columnIndex} className='cell-container'>
                                            <Cell
                                                state={cellState}
                                                className={cellClasses}
                                                onClick={() => this.cellOnClick(rowIndex, columnIndex)}
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
    boardState: PropTypes.array.isRequired,
    moveCell: PropTypes.func.isRequired
};

Board.defaultProps = {
    boardState: [
        [C1,C1,C1,C1,C1,C1],
        [CE,C1,C1,C1,C1,C1,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,C2,C2,C2,C2,C2,CE],
        [C2,C2,C2,C2,C2,C2]
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
