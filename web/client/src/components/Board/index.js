import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Cell from 'components/Cell';

import { CELL_PLAYER_1 as C1, CELL_PLAYER_2 as C2, CELL_EMPTY as CE } from 'constants/constants.js';

import './index.scss';

const Board = ({className, boardState}) => {
    const classes = classNames(className, 'board');

    return (
        <div className={classes}>
            {
                boardState.map((row, rIndex) => (
                    <div key={rIndex} className='row'>
                        {
                            row.map((cell, cIndex) => (
                                <div key={cIndex} className='cell-container'>
                                    <Cell state={cell} className='cell-bg'/>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
};

Board.propTypes = {
    className: PropTypes.string,
    boardState: PropTypes.array
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
    ]
};

export default Board;
