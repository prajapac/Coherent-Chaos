import React from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import Button from 'components/Button';
import Page from 'components/Page';

import './index.scss';

const MenuPage = ({onCreateGame, onJoinGame, loading}) => {
    return (
        <Page className='menu'>
            <Header
                className='menu-header'
                mid={<div>COHERENT CHAOS</div>}
            />
            {
                loading
                    ? <div className='tray'>
                        LOADING...
                    </div>
                    : <div className='tray'>
                        <Button className='tray-btn' bold text='Create Game' type='primary' onClick={onCreateGame}/>
                        <Button className='tray-btn' bold text='Join Game' type='secondary' onClick={onJoinGame}/>
                    </div>
            }

        </Page>
    );
};

MenuPage.propTypes = {
    onCreateGame: PropTypes.func,
    onJoinGame: PropTypes.func,
    loading: PropTypes.bool
};

export default MenuPage;
