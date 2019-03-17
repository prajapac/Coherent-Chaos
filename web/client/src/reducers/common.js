import {
    GAME_CREATE_STARTED,
    GAME_CREATE_COMPLETE,
    GAME_CREATE_FAILURE,

    GAME_JOIN_ATTEMPT_STARTED,
    GAME_JOIN_ATTEMPT_COMPLETE,
    GAME_JOIN_ATTEMPT_FAILURE,

    GAME_JOIN_PICK_PLAYER_STARTED,
    GAME_JOIN_PICK_PLAYER_COMPLETE,
    GAME_JOIN_PICK_PLAYER_FAILURE,

    GAME_MOVE_STARTED,
    GAME_MOVE_COMPLETE,
    GAME_MOVE_FAILURE,

    GAME_PING_SUCCESS,
    GAME_PING_FAILURE,

    GAME_EXIT,

    DISMISS_ERROR
} from 'actions';

import {
    PAGE_MENU,
    PAGE_GAME,
    PAGE_PLAYER_PICKER,
    PLAYER_1,
    PLAYER_2
} from 'constants';

import {
    mapAPIStateToAppState
} from 'utility/reducer-helpers';

const defaultState = {
    page: PAGE_MENU,

    gameState: {},
    chosenPlayer: null,
    playerToken: null,
    isOurTurn: false,

    joinLoading: false,
    createLoading: false,
    moveLoading: false,

    errorMessage: null
};

export default (state = defaultState, action) => {
    switch (action.type) {
        // CREATE GAME
        case GAME_CREATE_STARTED:
            return {
                ...state,
                createLoading: true,
                errorMessage: null
            };
        case GAME_CREATE_COMPLETE:
            return {
                ...state,
                createLoading: false,
                gameState: mapAPIStateToAppState(action.gameState),
                chosenPlayer: PLAYER_1,
                playerToken: action.gameState.token,
                isOurTurn: true,
                page: PAGE_GAME
            };
        case GAME_CREATE_FAILURE:
            return {
                ...state,
                createLoading: false,
                errorMessage: action.message,
                page: PAGE_MENU
            };

        // JOIN GAME - GET STATE
        case GAME_JOIN_ATTEMPT_STARTED:
            return {
                ...state,
                joinLoading: true,
                errorMessage: null
            };
        case GAME_JOIN_ATTEMPT_COMPLETE:
            return {
                ...state,
                joinLoading: false,
                gameState: mapAPIStateToAppState(action.gameState),
                page: PAGE_PLAYER_PICKER
            };
        case GAME_JOIN_ATTEMPT_FAILURE:
            return {
                ...state,
                joinLoading: false,
                errorMessage: action.message,
                page: PAGE_MENU
            };

        // JOIN GAME - PICK PLAYER
        case GAME_JOIN_PICK_PLAYER_STARTED:
            return {
                ...state,
                joinLoading: true,
                errorMessage: null
            };
        case GAME_JOIN_PICK_PLAYER_COMPLETE:
            return {
                ...state,
                joinLoading: false,
                chosenPlayer: action.playerChoice,
                playerToken: action.token,
                isOurTurn: state.gameState.whoseTurn === action.playerChoice,
                page: PAGE_GAME
            };
        case GAME_JOIN_PICK_PLAYER_FAILURE:
            return {
                ...state,
                joinLoading: false,
                errorMessage: action.message,
                page: PAGE_MENU
            };

        // MAKE MOVE
        case GAME_MOVE_STARTED:
            return {
                ...state,
                moveLoading: true,
                errorMessage: null
            };
        case GAME_MOVE_COMPLETE:
            return {
                ...state,
                gameState: mapAPIStateToAppState(action.gameState),
                isOurTurn: action.gameState.whose_turn === state.chosenPlayer,
                moveLoading: false,
            };
        case GAME_MOVE_FAILURE:
            return {
                ...state,
                errorMessage: action.message
            };

        // PING
        case GAME_PING_FAILURE:
            return {
                ...state,
                gameState: {},
                chosenPlayer: null,
                playerToken: null,
                joinLoading: false,
                createLoading: false,
                errorMessage: action.message,
                page: PAGE_MENU
            };
        case GAME_PING_SUCCESS:
            return {
                ...state,
                gameState: mapAPIStateToAppState(action.gameState),
                isOurTurn: action.gameState.whose_turn === state.chosenPlayer
            };

        // EXIT GAME
        case GAME_EXIT:
            return {
                ...state,
                gameState: {},
                chosenPlayer: null,
                playerToken: null,
                joinLoading: false,
                createLoading: false,
                page: PAGE_MENU
            };

        // DISMISS ERROR
            case DISMISS_ERROR:
                return {
                    ...state,
                    errorMessage: null
                };
        default:
            return state;
    }
};
