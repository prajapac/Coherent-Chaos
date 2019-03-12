import {
    GAME_CREATE_STARTED,
    GAME_CREATE_COMPLETE,

    GAME_JOIN_STARTED,
    GAME_JOIN_COMPLETE,

    GAME_EXIT,

    GAME_PLAYER_CHOSEN
} from 'actions';

import {
    PAGE_MENU,
    PAGE_GAME,
    PAGE_PLAYER_PICKER,
    PLAYER_1,
    PLAYER_2
} from 'constants';

const defaultState = {
    page: PAGE_MENU,

    gameState: {},
    chosenPlayer: null,
    playerToken: null,

    joinLoading: false,
    createLoading: false
};

export default (state = defaultState, action) => {
    switch (action.type) {
        // CREATE GAME
        case GAME_CREATE_STARTED:
            return {
                ...state,
                createLoading: true
            };
        case GAME_CREATE_COMPLETE:
            return {
                ...state,
                createLoading: false,
                gameState: action.gameState,
                chosenPlayer: PLAYER_1,
                playerToken: action.token,
                page: PAGE_GAME
            };

        // JOIN GAME
        case GAME_JOIN_STARTED:
            return {
                ...state,
                joinLoading: true
            };
        case GAME_JOIN_COMPLETE:
            return {
                ...state,
                joinLoading: false,
                page: PAGE_PLAYER_PICKER
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

        // CHOOSE PLAYER
        case GAME_PLAYER_CHOSEN:
            return {
                ...state,
                page: PAGE_GAME,
                chosenPlayer: action.playerChoice
            };

        default:
            return state;
    }
}
