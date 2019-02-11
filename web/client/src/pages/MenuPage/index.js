import React from 'react';
import PropTypes from 'prop-types';

import { PAGE_MENU } from 'constants/constants';

import Header from 'components/Header';
import Button from 'components/Button';
import Page from 'components/Page';

import './index.scss';

const MenuPage = ({onCreateGame, onJoinGame}) => {
    return (
        <Page mode={PAGE_MENU} className='menu'>
            <Header
                className='menu-header'
                mid={<div>COHERENT CHAOS</div>}
            />
            <div className='tray'>
                <Button className='tray-btn' bold text='Create Game' type='primary' onClick={onCreateGame}/>
                <Button className='tray-btn' bold text='Join Game' type='secondary' onClick={onJoinGame}/>
                <Button className='tray-btn' bold text='Test Btn' type='tertiary' onClick={onJoinGame}/>
            </div>
        </Page>
    );
};

MenuPage.propTypes = {
    onCreateGame: PropTypes.func,
    onJoinGame:PropTypes.func
};

export default MenuPage;
