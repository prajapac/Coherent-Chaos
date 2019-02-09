import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';


const Header = ({className, left, mid, right}) => {
    const classes = classNames(className, 'header');

    return (
        <div className={classes}>
            <div className='header__left'>
                {left}
            </div>
            <div className='header__mid'>
                {mid}
            </div>
            <div className='header__right'>
                {right}
            </div>
        </div>
    );
};

Header.propTypes = {
    className: PropTypes.string,
    left: PropTypes.node,
    mid: PropTypes.node,
    right: PropTypes.node
};

Header.defaultProps = {
};

export default Header;
