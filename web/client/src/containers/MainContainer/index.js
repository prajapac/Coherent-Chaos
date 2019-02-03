import React from 'react';
import { connect } from 'react-redux';

import { APP_NAV, GAME_CREATE, GAME_JOIN, GAME_EXIT } from "actions";
import { PAGE_MENU, PAGE_GAME } from "constants/constants";

import MenuPage from 'pages/MenuPage';
import GamePage from 'pages/GamePage';

const mapDispatchToProps = dispatch => ({
    onExitGame: () =>
        dispatch({ type: GAME_EXIT }),
    onJoinGame: () =>
        dispatch({ type: GAME_JOIN }),
    onCreateGame: () =>
        dispatch({ type: GAME_CREATE }),
});

const mapStateToProps = state => ({
    page: state.common.page,
    gameId: state.common.gameId
});

class MainContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // TODO: Transitions and loading screen
        switch (this.props.page) {
            case PAGE_GAME:
                return (
                    <GamePage onExitGame={this.props.onExitGame} gameId={this.props.gameId}/>
                );
            default:
                return (
                    <MenuPage onCreateGame={this.props.onCreateGame} onJoinGame={this.props.onJoinGame}/>
                );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
