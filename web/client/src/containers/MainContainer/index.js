import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { GAME_CREATE_BEGIN, GAME_JOIN_BEGIN, GAME_EXIT, GAME_PLAYER_CHOSEN } from 'actions';
import { PAGE_PLAYER_PICKER, PAGE_GAME, PAGE_MENU } from 'constants';

import MenuPage from 'pages/MenuPage';
import GamePage from 'pages/GamePage';
import PlayerPickerPage from 'pages/PlayerPickerPage';

const mapDispatchToProps = dispatch => ({
    onExitGame: () =>
        dispatch({ type: GAME_EXIT }),
    onJoinGame: (gameId) =>
        dispatch({ type: GAME_JOIN_BEGIN, gameId: gameId }),
    onCreateGame: () =>
        dispatch({ type: GAME_CREATE_BEGIN }),
    onPlayerChoose: (player) =>
        dispatch({ type: GAME_PLAYER_CHOSEN, playerChoice: player }),
});

const mapStateToProps = state => ({
    page: state.common.page,
    gameState: state.common.gameState,
    loading: state.common.joinLoading || state.common.createLoading,
    chosenPlayer: state.chosenPlayer
});

class MainContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        switch (this.props.page) {
            case PAGE_GAME:
                return (
                    <GamePage
                        onExitGame={this.props.onExitGame}
                        gameState={this.props.gameState}
                        chosenPlayer={this.props.chosenPlayer}
                    />
                );
            case PAGE_PLAYER_PICKER:
                return (
                    <PlayerPickerPage
                        onExitGame={this.props.onExitGame}
                        onPlayerChoose={this.props.onPlayerChoose}
                        gameState={this.props.gameState}
                    />
                );
            default:
                return (
                    <MenuPage
                        onCreateGame={this.props.onCreateGame}
                        onJoinGame={this.props.onJoinGame}
                        loading={this.props.loading}
                    />
                );
        }
    }
}

MainContainer.propTypes = {
    // Application state as props
    page: PropTypes.string,
    gameState: PropTypes.object,
    loading: PropTypes.bool,

    // Dispatch functions
    onExitGame: PropTypes.func,
    onCreateGame: PropTypes.func,
    onJoinGame: PropTypes.func,
    onPlayerChoose: PropTypes.func,
};

MainContainer.defaultProps = {
    page: PAGE_MENU,
    gameState: {},
    loading: false,

    onExitGame: () => {},
    onCreateGame: () => {},
    onJoinGame: () => {},
    onPlayerChoose: () => {}
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
