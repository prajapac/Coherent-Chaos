import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';

const Cell = ({className, state}) => {
    const classes = classNames(className, state, 'cell');

    return (
        if (state === states.player1) {
            <Hexagon className={classes} color='primary' />
        }
        else if (state === states.player2) {
            <Hexagon className={classes} color='secondary' />
        }
        else if (state === states.out) {
            <Hexagon className={classes} color='dark' />
        }
        else if (state === states.empty) {
            <Hexagon className={classes} color='light' />
        }
    );
};

enum states = {
    Player1Pawn,
    Player2Pawn,
    OutOfPlay,
    Empty,
}

Cell.propTypes = {
    className: PropTypes.string,
    state: PropTypes.oneOf(Object.keys(states)),
};

Cell.defaultProps = {
    state: 'empty',
};

Cell.states = states

export default Cell;
