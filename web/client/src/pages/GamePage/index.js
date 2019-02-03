import React from 'react';
import PropTypes from 'prop-types';

import { PAGE_GAME } from "constants/constants";

import Page from 'components/Page';

import './index.scss';

const GamePage = ({onExitGame}) => {
    return (
        <Page mode={PAGE_GAME} className='menu' onExitGame={onExitGame}>
            CONTENT
        </Page>
    );
};

GamePage.propTypes = {
    gameId: PropTypes.number,
    onExitGame: PropTypes.func
};

export default GamePage;
