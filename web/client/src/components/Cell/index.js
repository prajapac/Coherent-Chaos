import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Hexagon from 'components/Hexagon';
import { CELL_PLAYER_1, CELL_PLAYER_2, CELL_OUT_OF_PLAY, CELL_EMPTY } from 'constants/constants.js';

import './index.scss';

const Cell = ({className, state}) => {
    const classes = classNames(className, state, 'cell');
    let cellColor;

    switch(state) {
        case CELL_PLAYER_1:
            cellColor = 'primary';
            break;
        case CELL_PLAYER_2:
            cellColor = 'secondary';
            break;
        case CELL_OUT_OF_PLAY:
            cellColor = 'dark';
            break;
        default:
            cellColor = 'light';
    }

    return (
        <Hexagon className={classes} color={cellColor} />
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
