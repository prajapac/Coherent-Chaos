import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';

const Spinner = ({className, ...props}) => {
    const classes = classNames('lds-ellipsis', 'spinner', className);

    return (
        <div className={classes} {...props}>
            <div/>
            <div/>
            <div/>
            <div/>
        </div>
    );
};

Spinner.propTypes = {
    className: PropTypes.string
};

export default Spinner;
