import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';

const Cell = ({className, state, ...props}) => {
    const classes = classNames(className, state, 'cell');

    return (
        <Hexagon className={'boardCell'} color={'light'}/>
    );
};

const states = {
    PLAYER_1: 'Player1Pawn',
    PLAYER_2: 'Player2Pawn',
    OUT: 'OutOfPlay',
    EMPTY: 'Empty',
}

Cell.propTypes = {
    className: PropTypes.string,
    state: PropTypes.oneOf(Object.keys(states))
};

Cell.defaultProps = {
    state: 'Empty'
};

export default Cell;
