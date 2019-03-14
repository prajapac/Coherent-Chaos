import React from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import Button from 'components/Button';
import Page from 'components/Page';
import Board from 'components/Board';
import Logo from 'components/Logo';

import './index.scss';

const GamePage = ({chosenPlayer, gameState, onExitGame}) => {
    return (
        <Page className='game'>
            <Header
                className='game-header'
                left={<Button className='header-btn left' text='< Leave' onClick={onExitGame}/>}
                mid={<Logo/>}
                right={<div className='header-gid'>#{gameState.id}</div>}
            />
            <div className='body'>
                <Board boardState={gameState.board} selectedPlayer={chosenPlayer} className='gameBoard'/>
            </div>

        </Page>
    );
};

GamePage.propTypes = {
    chosenPlayer: PropTypes.number,
    gameState: PropTypes.object,
    onExitGame: PropTypes.func
};

export default GamePage;
