import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';

const Hexagon = ({className, color, ...props}) => {
    const classes = classNames(className, color, 'hex');

    return (
        <svg
            className={classes}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='-2 -2 104 91'
            preserveAspectRatio='xMidYMid meet'
            {...props}
        >
            <path d="M0 43.30127018922193L25 0L75 0L100 43.30127018922193L75 86.60254037844386L25 86.60254037844386Z" />
        </svg>
    );
};

Hexagon.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'light', 'dark'])
};

Hexagon.defaultProps = {
    color: 'light'
};

export default Hexagon;
