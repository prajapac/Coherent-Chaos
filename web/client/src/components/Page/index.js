import React from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames';

import { PAGE_GAME, PAGE_MENU } from "constants/constants";

import Header from 'components/Header';
import Button from 'components/Button';

import './index.scss';

const renderHeader = (mode, gameId, onExitGame) => {
    switch (mode) {
        case PAGE_MENU:
            return (
                <Header
                    mid={<div>LOGO</div>}
                />
            );
        default:
            return (
                <Header
                    left={<Button className='header-btn left' text='< Leave Game' onClick={onExitGame}/>}
                    mid={<div>LOGO</div>}
                    right={<div className='header-gid'>#{gameId}</div>}
                />
            );
    }
};

const Page = ({className, mode, gameId, onExitGame, children, ...props}) => {
    const classes = classNames(className, 'page');

    return (
        <div className={classes} {...props}>
            {renderHeader(mode, gameId, onExitGame)}
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
