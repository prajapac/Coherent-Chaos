import React from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import Page from 'components/Page';
import Button from 'components/Button';
import PlayerPicker from 'components/PlayerPicker';

import './index.scss';

const MenuPage = ({onPlayerChoose, onExitGame, gameId}) => {
    return (
        <Page className='menu'>
            <Header
                className='game-header'
                left={<Button className='header-btn left' text='< Leave' onClick={onExitGame}/>}
                mid={<div>COHERENT CHAOS</div>}
                right={<div className='header-gid'>#{gameId}</div>}
            />
            <div className='tray'>
                <PlayerPicker onChoose={onPlayerChoose}/>
            </div>
        </Page>
    );
};

MenuPage.propTypes = {
    onPlayerChoose: PropTypes.func,
    onExitGame: PropTypes.func,
    gameId: PropTypes.number,
};

export default MenuPage;
