import React from 'react';
import PropTypes from 'prop-types';

import { PAGE_MENU } from "constants/constants";

import Page from 'components/Page';
import Button from 'components/Button';

import './index.scss';

const MenuPage = ({onCreateGame, onJoinGame}) => {
    return (
        <Page mode={PAGE_MENU} className='menu'>
            <div className='tray'>
                <Button className='tray-btn' bold rounded text='Create Game' type='primary' onClick={onCreateGame}/>
                <Button className='tray-btn' bold rounded text='Join Game' type='primary' onClick={onJoinGame}/>
            </div>
        </Page>
    );
};

MenuPage.propTypes = {
    onCreateGame: PropTypes.func,
    onJoinGame:PropTypes.func
};

export default MenuPage;
