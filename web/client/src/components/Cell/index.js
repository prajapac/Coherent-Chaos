import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Hexagon from 'components/Hexagon';

import {
    COLOR_OPTION_DARK, COLOR_OPTION_LIGHT, COLOR_OPTION_PRIMARY, COLOR_OPTION_SECONDARY,
    CELL_PLAYER_1, CELL_PLAYER_2, CELL_OUT_OF_PLAY, CELL_EMPTY
} from 'constants';

import './index.scss';

export const getCellColor = (state) => {
    switch(state) {
        case CELL_PLAYER_1:
            return COLOR_OPTION_PRIMARY;
        case CELL_PLAYER_2:
            return COLOR_OPTION_SECONDARY;
        case CELL_OUT_OF_PLAY:
            return COLOR_OPTION_DARK;
        default:
            return COLOR_OPTION_LIGHT;
    }
};

const Cell = ({className, state, ...props}) => {
    const classes = classNames(className, state, 'cell');
    let cellColor = getCellColor(state);

    return (
        <Hexagon className={classes} color={cellColor} {...props}/>
    );
};

Cell.propTypes = {
    className: PropTypes.string,
    state: PropTypes.oneOf([CELL_PLAYER_1, CELL_PLAYER_2, CELL_EMPTY, CELL_OUT_OF_PLAY])
};

Cell.defaultProps = {
    state: CELL_EMPTY
};

export default Cell;
