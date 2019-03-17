import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    GAME_CREATE_BEGIN,
    GAME_JOIN_ATTEMPT_BEGIN,
    GAME_JOIN_PICK_PLAYER_BEGIN,
    GAME_MOVE_BEGIN,
    GAME_EXIT,
    DISMISS_ERROR
} from 'actions';
import { PAGE_PLAYER_PICKER, PAGE_GAME, PAGE_MENU } from 'constants';

import MenuPage from 'pages/MenuPage';
import GamePage from 'pages/GamePage';
import PlayerPickerPage from 'pages/PlayerPickerPage';
import InfoBox from 'components/InfoBox';

const mapDispatchToProps = dispatch => ({
    onExitGame: () =>
        dispatch({ type: GAME_EXIT }),

    onJoinGameAttempt: (gameId) =>
        dispatch({ type: GAME_JOIN_ATTEMPT_BEGIN, gameId: gameId }),

    onJoinGamePickPlayer: (gameId, player) =>
        dispatch({ type: GAME_JOIN_PICK_PLAYER_BEGIN, playerChoice: player, gameId: gameId }),

    onCreateGame: () =>
        dispatch({ type: GAME_CREATE_BEGIN }),

    onDismissError: () =>
        dispatch({ type: DISMISS_ERROR }),

    onCellMove: (selectedCell, targetCell) => {
        let move = {
            selectedCell: {
                rowIndex: selectedCell.rowIndex,
                columnIndex: selectedCell.columnIndex
            },
            targetCell: {
                rowIndex: targetCell.rowIndex,
                columnIndex: targetCell.columnIndex
            },
            hoppedCell: targetCell.hoppedCell
                ? {
                    rowIndex: targetCell.hoppedCell.rowIndex,
                    columnIndex: targetCell.hoppedCell.columnIndex
                }
                : null
        };

        dispatch({ type: GAME_MOVE_BEGIN, move: move });
    }
});

const mapStateToProps = state => ({
    page: state.common.page,
    gameState: state.common.gameState,
    loading: state.common.joinLoading || state.common.createLoading,
    chosenPlayer: state.common.chosenPlayer,
    errorMessage: state.common.errorMessage,
    isOurTurn: state.common.isOurTurn
});

const renderPage = (props) => {
    switch (props.page) {
        case PAGE_GAME:
            return (
                <GamePage
                    onCellMove={props.onCellMove}
                    onExitGame={props.onExitGame}
                    gameState={props.gameState}
                    chosenPlayer={props.chosenPlayer}
                    isOurTurn={props.isOurTurn}
                />
            );
        case PAGE_PLAYER_PICKER:
            return (
                <PlayerPickerPage
                    onExitGame={props.onExitGame}
                    onPlayerChoose={props.onJoinGamePickPlayer}
                    gameState={props.gameState}
                />
            );
        default:
            return (
                <MenuPage
                    onCreateGame={props.onCreateGame}
                    onJoinGame={props.onJoinGameAttempt}
                    loading={props.loading}
                    errorMessage={props.errorMessage}
                />
            );
    }
};

class MainContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {renderPage(this.props)}
                <InfoBox message={this.props.errorMessage} onClose={this.props.onDismissError}/>
            </div>
        );
    }
}

MainContainer.propTypes = {
    // Application state as props
    page: PropTypes.string,
    gameState: PropTypes.object,
    loading: PropTypes.bool,
    chosenPlayer: PropTypes.number,

    // Dispatch functions
    onExitGame: PropTypes.func,
    onCreateGame: PropTypes.func,
    onJoinGame: PropTypes.func,
    onDismissError: PropTypes.func
};

MainContainer.defaultProps = {
    page: PAGE_MENU,
    gameState: {},
    loading: false,
    chosenPlayer: null,

    onExitGame: () => {},
    onCreateGame: () => {},
    onJoinGame: () => {},
    onDismissError: () => {}
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
