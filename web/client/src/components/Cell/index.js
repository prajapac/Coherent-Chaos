import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';

const Cell = ({className, state, color}) => {
    const classes = classNames(className, state, color, 'cell');

    return (
        <Hexagon className={classes}/>
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
