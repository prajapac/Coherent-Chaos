import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';

const Cell = ({className, state, ...props}) => {
    const classes = classNames(className, state, 'cell');

    return (
    );
};

Cell.propTypes = {
    className: PropTypes.string,
    state: PropTypes.oneOf(['player 1 pawn', 'player 2 pawn', 'out of play', 'empty'])
};

Cell.defaultProps = {
    state: 'empty'
};

export default Cell;
