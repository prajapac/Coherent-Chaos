import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';

const Page = ({className, children, ...props}) => {
    const classes = classNames(className, 'page');

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );

};

Page.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};

export default Page;
