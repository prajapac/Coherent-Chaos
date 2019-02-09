import React from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames';

import { PAGE_GAME, PAGE_MENU } from "constants/constants";

import './index.scss';

const Page = ({className, mode, gameId, onExitGame, children, ...props}) => {
    const classes = classNames(className, 'page');

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );

};

Page.propTypes = {
    className: PropTypes.string,
    mode: PropTypes.oneOf([PAGE_MENU, PAGE_GAME]),
    gameId: PropTypes.number,
    onExitGame: PropTypes.func,
    children: PropTypes.node
};

Page.defaultProps = {
    mode: PAGE_MENU
};

export default Page
