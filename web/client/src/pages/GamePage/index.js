import React from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import Button from 'components/Button';
import Page from 'components/Page';
import Board from 'components/Board';
import Logo from 'components/Logo';

import './index.scss';

const GamePage = ({isOurTurn, chosenPlayer, gameState, onExitGame, onCellMove}) => {
    return (
        <Page className='game'>
            <Header
                className='game-header'
                left={<Button className='header-btn left' text='< Leave' onClick={onExitGame}/>}
                mid={<Logo/>}
                right={<div className='header-gid'>#{gameState.id}</div>}
            />
            <div className='body'>
                <Board isOurTurn={isOurTurn} moveCell={onCellMove} boardState={gameState.board} selectedPlayer={chosenPlayer} className='gameBoard'/>
            </div>

        </Page>
    );
};

GamePage.propTypes = {
    isOurTurn: PropTypes.bool,
    chosenPlayer: PropTypes.number,
    gameState: PropTypes.object,
    onExitGame: PropTypes.func,
    onCellMove: PropTypes.func
};

export default GamePage;
