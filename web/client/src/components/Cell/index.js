import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Constants from '../../constants/constants.js'

import './index.scss';

const Cell = ({className, state}) => {
    const classes = classNames(className, state, 'cell');

    return (
        let cellColor = 'light';

        if (state === Constants.CELL_PLAYER_1) {
            cellColor='primary';
        }
        else if (state === Constants.CELL_PLAYER_2) {
            cellColor='secondary';
        }
        else if (state === Constants.CELL_OUT_OF_PLAY) {
            cellColor='dark';
        }

        <Hexagon className={classes} color={cellColor} />
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
