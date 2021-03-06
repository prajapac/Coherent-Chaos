import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { COLOR_OPTION_DARK, COLOR_OPTION_LIGHT, COLOR_OPTION_PRIMARY, COLOR_OPTION_SECONDARY, COLOR_OPTION_TERTIARY,
         SIZE_SMALL, SIZE_LARGE} from 'constants';

import './index.scss';

const Hexagon = ({className, color, size, ...props}) => {
    const classes = classNames(className, color, size === SIZE_SMALL? 'hex-small':'hex-large');

    return (
        <svg
            className={classes}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='-2 -2 104 91'
            preserveAspectRatio='xMidYMid meet'
            {...props}
        >
            <path d='M0 43.30127018922193L25 0L75 0L100 43.30127018922193L75 86.60254037844386L25 86.60254037844386Z'/>
        </svg>
    );
};

Hexagon.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf([COLOR_OPTION_DARK, COLOR_OPTION_LIGHT, COLOR_OPTION_PRIMARY, COLOR_OPTION_SECONDARY, COLOR_OPTION_TERTIARY]),
    size: PropTypes.oneOf([SIZE_SMALL, SIZE_LARGE])
};

Hexagon.defaultProps = {
    color: COLOR_OPTION_LIGHT
};

export default Hexagon;
