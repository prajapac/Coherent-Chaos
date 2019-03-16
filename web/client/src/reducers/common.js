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

    GAME_EXIT,
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
} from 'utility';

const defaultState = {
    page: PAGE_MENU,

    gameState: {},
    chosenPlayer: null,
    playerToken: null,

    joinLoading: false,
    createLoading: false,

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
                playerToken: action.gameState.player1_token,
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
                page: PAGE_GAME
            };
        case GAME_JOIN_PICK_PLAYER_FAILURE:
            return {
                ...state,
                joinLoading: false,
                errorMessage: action.message,
                page: PAGE_MENU
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

        default:
            return state;
    }
};
