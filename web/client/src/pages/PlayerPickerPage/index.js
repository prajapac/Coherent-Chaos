import React from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import Page from 'components/Page';
import Button from 'components/Button';
import PlayerPicker from 'components/PlayerPicker';

import './index.scss';

const MenuPage = ({onPlayerChoose, onExitGame, gameState}) => {
    return (
        <Page className='picker'>
            <Header
                className='game-header'
                left={<Button className='header-btn left' text='< Leave' onClick={onExitGame}/>}
                right={<div className='header-gid'>#{gameState.id}</div>}
            />
            <div className='tray'>
                <PlayerPicker
                    player1Disabled={gameState.player1Active}
                    player2Disabled={gameState.player2Active}
                    gameId={gameState.id}
                    onChoose={onPlayerChoose}
                />
            </div>
        </Page>
    );
};

MenuPage.propTypes = {
    onPlayerChoose: PropTypes.func,
    onExitGame: PropTypes.func,
    gameState: PropTypes.object
};

MenuPage.defaultProps = {
    gameState: {}
};

export default MenuPage;
