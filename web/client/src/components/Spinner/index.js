import React from 'react';
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
    )
};

export default Spinner;
