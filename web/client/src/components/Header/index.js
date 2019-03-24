import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Logo from "components/Logo";

import './index.scss';

const Header = ({className, left, right}) => {
    const classes = classNames(className, 'header');

    return (
        <div className={classes}>
            <div className='header__left'>
                {left}
            </div>
            <div className='header__mid'>
                <Logo className='logo' long/>
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
    right: PropTypes.node
};

Header.defaultProps = {
};

export default Header;
