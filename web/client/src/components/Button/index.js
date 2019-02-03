import React from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames';

import './index.scss';

const Button = ({className, onClick, size, type, rounded, bold, text, ...props}) => {
    const classes = classNames(className, size, type, {
        'rounded': rounded,
        'bold': bold
    }, 'btn');

    return (
        <button className={classes} onClick={onClick} {...props}>
            {text}
        </button>
    );
};

Button.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['full', 'fixed']),
    type: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'light']),
    rounded: PropTypes.bool,
    bold: PropTypes.bool,
    text: PropTypes.string
};

Button.defaultProps = {
    size: 'fixed',
    type: 'light',
    rounded: false,
    bold: false
};

export default Button;
