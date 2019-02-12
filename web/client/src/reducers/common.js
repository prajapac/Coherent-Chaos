import {
    APP_NAV,
    GAME_CREATE,
    GAME_JOIN,
    GAME_EXIT
} from 'actions';

import { PAGE_MENU, PAGE_GAME } from 'constants/constants';

const defaultState = {
    page: PAGE_MENU,
    gameId: null
};

export default (state = defaultState, action) => {
    switch (action.type) {
    case APP_NAV:
        return {
            ...state,
            page: action.page
        };
    case GAME_CREATE: // TODO
        return {
            ...state,
            page: PAGE_GAME
        };
    case GAME_JOIN: // TODO
        return {
            ...state,
            page: PAGE_GAME
        };
    case GAME_EXIT: // TODO
        return {
            ...state,
            page: PAGE_MENU
        };
    default:
        return state;
    }
}

