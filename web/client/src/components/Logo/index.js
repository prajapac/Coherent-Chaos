import React from 'react';
import PropTypes from 'prop-types';

import config from 'constants/config.js';

import './index.scss';

const Logo = ({className, long}) => {
    return (
        <img
            src={long ? config.LOGO_LONG_URL : config.LOGO_URL}
            className='logo'
            alt='Coherent Chaos'
        />
    );
};

Logo.propTypes = {
    className: PropTypes.string,
    long: PropTypes.bool
};

Logo.defaultProps = {
    long: false
};

export default Logo;
