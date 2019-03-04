import {
    GAME_CREATE_STARTED,
    GAME_CREATE_COMPLETE,
    GAME_JOIN_STARTED,
    GAME_JOIN_COMPLETE,
    GAME_EXIT
} from 'actions';

import { PAGE_MENU, PAGE_GAME } from 'constants/constants';

const defaultState = {
    page: PAGE_MENU,
    gameId: null,
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
                page: PAGE_GAME
            };

        // EXIT GAME
        case GAME_EXIT:
            return {
                ...state,
                gameId: null,
                page: PAGE_MENU
            };

        default:
            return state;
    }
}
