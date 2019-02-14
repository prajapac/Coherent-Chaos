import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';

const Cell = ({className, state}) => {
    const classes = classNames(className, state, 'cell');

    return (
        if (state === states.player1) {
            <Hexagon className={classes} color=colors.primary />
        }
        else if (state === states.player2) {
            <Hexagon className={classes} color=colors.secondary />
        }
        else if (state === states.out) {
            <Hexagon className={classes} color=colors.dark />
        }
        else if (state === states.empty) {
            <Hexagon className={classes} color=colors.light />
        }
    );
};

const states = {
    player1: 'player1Pawn',
    player2: 'player2Pawn',
    out: 'outOfPlay',
    empty: 'empty',
}

const colors = {
    primary: 'primary',
    secondary: 'secondary',
    tertiary: 'tertiary',
    light: 'light',
    dark: 'dark',
}

Cell.propTypes = {
    className: PropTypes.string,
    state: PropTypes.oneOf(Object.keys(states)),
    color: PropTypes.oneOf(Object.keys(colors)),
};

Cell.defaultProps = {
    state: 'empty',
    color: 'light',
};

Cell.states = states
Cell.colors = colors

export default Cell;
