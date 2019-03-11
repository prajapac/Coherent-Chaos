import React from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import Page from 'components/Page';
import CreateJoinPrompt from 'components/CreateJoinPrompt';

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
                        <CreateJoinPrompt
                            className='menu-create-join-prompt'
                            join={onJoinGame}
                            create={onCreateGame}/>
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
