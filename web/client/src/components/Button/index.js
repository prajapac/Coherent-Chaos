import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';

const Button = ({className, onClick, size, type, rounded, bold, disabled, text, ...props}) => {
    const classes = classNames(className, size, type, {
        'rounded': rounded,
        'bold': bold,
        'disabled': disabled
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
    type: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'basic']),
    rounded: PropTypes.bool,
    bold: PropTypes.bool,
    disabled: PropTypes.bool,
    text: PropTypes.string
};

Button.defaultProps = {
    size: 'fixed',
    type: 'basic',
    rounded: false,
    bold: false
};

export default Button;
