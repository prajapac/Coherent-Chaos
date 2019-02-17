import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Cell from 'components/Cell';

import './index.scss';

const Board = ({className, boardState}) => {
    const classes = classNames(className, 'board');

    const board = boardState.map((row, rowIndex) => {
        return (
            <div key={'row' + rowIndex} className={'row flex-container'}>{
                row.slice(1, row[0] + 1).map((col, colIndex) => {
                    return (
                        <div key={'col' + colIndex + '-' + rowIndex} className={'col'}><Cell
                            className={'boardCell' + rowIndex + '-' +colIndex} state={col}/>
                        </div>
                    )
                })
            }</div>
        )
    });

    return (<div className={classes} >{board}</div>)

};

Board.propTypes = {
    className: PropTypes.string,
    boardState: PropTypes.array
};

Board.defaultProps = {
    boardState: [[6,1,1,1,1,1,1,0,0,0,0,0,0],
        [7,0,1,1,1,1,1,0,0,0,0,0,0],
        [8,0,0,0,0,0,0,0,0,0,0,0,0],
        [9,0,0,0,0,0,0,0,0,0,0,0,0],
        [10,0,0,0,0,0,0,0,0,0,0,0,0],
        [11,0,0,0,0,0,0,0,0,0,0,0,0],
        [10,0,0,0,0,0,0,0,0,0,0,0,0],
        [9,0,0,0,0,0,0,0,0,0,0,0,0],
        [8,0,0,0,0,0,0,0,0,0,0,0,0],
        [7,0,2,2,2,2,2,0,0,0,0,0,0],
        [6,2,2,2,2,2,2,0,0,0,0,0,0]]
};

export default Board;