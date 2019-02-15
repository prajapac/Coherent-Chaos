import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Constants from '../../constants/constants.js'

import './index.scss';

const Cell = ({className, state}) => {
    const classes = classNames(className, state, 'cell');

    return (
        if (state === Constants.CELL_PLAYER_1) {
            <Hexagon className={classes} color='primary' />
        }
        else if (state === Constants.CELL_PLAYER_2) {
            <Hexagon className={classes} color='secondary' />
        }
        else if (state === Constants.CELL_OUT_OF_PLAY) {
            <Hexagon className={classes} color='dark' />
        }
        else if (state === Constants.CELL_EMPTY) {
            <Hexagon className={classes} color='light' />
        }
    );
};

Cell.propTypes = {
    className: PropTypes.string,
    state: PropTypes.oneOf(Object.keys(states)),
};

Cell.defaultProps = {
    state: 'empty',
};

Cell.states = states

export default Cell;
