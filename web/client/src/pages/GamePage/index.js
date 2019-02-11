import React from 'react';
import PropTypes from 'prop-types';

import { PAGE_GAME } from 'constants/constants';

import Header from 'components/Header';
import Button from 'components/Button';
import Page from 'components/Page';

import './index.scss';

const GamePage = ({gameId, onExitGame}) => {
    return (
        <Page mode={PAGE_GAME} className='game' onExitGame={onExitGame}>
            <Header
                className='game-header'
                left={<Button className='header-btn left' text='< Leave' onClick={onExitGame}/>}
                mid={<div>COHERENT CHAOS</div>}
                right={<div className='header-gid'>#{gameId}</div>}
            />

        </Page>
    );
};

GamePage.propTypes = {
    gameId: PropTypes.number,
    onExitGame: PropTypes.func
};

export default GamePage;
