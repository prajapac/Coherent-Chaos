import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { GAME_CREATE_BEGIN, GAME_JOIN_BEGIN, GAME_EXIT } from 'actions';
import { PAGE_GAME } from 'constants/constants';

import MenuPage from 'pages/MenuPage';
import GamePage from 'pages/GamePage';

const mapDispatchToProps = dispatch => ({
    onExitGame: () =>
        dispatch({ type: GAME_EXIT }),
    onJoinGame: () =>
        dispatch({ type: GAME_JOIN_BEGIN }),
    onCreateGame: () =>
        dispatch({ type: GAME_CREATE_BEGIN }),
});

const mapStateToProps = state => ({
    page: state.common.page,
    gameId: state.common.gameId,
    loading: state.common.joinLoading || state.common.createLoading
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
                    <MenuPage onCreateGame={this.props.onCreateGame} onJoinGame={this.props.onJoinGame} loading={this.props.loading}/>
                );
        }
    }
}

MainContainer.propTypes = {
    // Application state as props
    page: PropTypes.string,
    gameId: PropTypes.number,
    loading: PropTypes.bool,

    // Dispatch functions
    onExitGame: PropTypes.func,
    onCreateGame: PropTypes.func,
    onJoinGame: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
