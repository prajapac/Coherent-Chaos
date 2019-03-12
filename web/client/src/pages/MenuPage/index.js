import React from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import Page from 'components/Page';
import Spinner from 'components/Spinner';
import GameCreateJoinPrompt from 'components/GameCreateJoinPrompt';
import Logo from 'components/Logo';

import './index.scss';

const MenuPage = ({onCreateGame, onJoinGame, loading}) => {
    return (
        <Page className='menu'>
            <Header
                className='menu-header'
                mid={<Logo/>}
            />
            {
                loading
                    ? <div className='tray'>
                        <Spinner/>
                    </div>
                    : <div className='tray'>
                        <GameCreateJoinPrompt
                            onJoinGame={onJoinGame}
                            onCreateGame={onCreateGame}/>
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
