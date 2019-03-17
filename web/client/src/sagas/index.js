import { put, takeLatest, select } from 'redux-saga/effects';
import {
    GAME_CREATE_BEGIN, GAME_CREATE_STARTED, GAME_CREATE_COMPLETE, GAME_CREATE_FAILURE,
    GAME_JOIN_ATTEMPT_BEGIN, GAME_JOIN_ATTEMPT_STARTED, GAME_JOIN_ATTEMPT_COMPLETE, GAME_JOIN_ATTEMPT_FAILURE,
    GAME_JOIN_PICK_PLAYER_BEGIN, GAME_JOIN_PICK_PLAYER_STARTED, GAME_JOIN_PICK_PLAYER_COMPLETE, GAME_JOIN_PICK_PLAYER_FAILURE,
    GAME_MOVE_BEGIN, GAME_MOVE_STARTED, GAME_MOVE_COMPLETE, GAME_MOVE_FAILURE,
    GAME_PING_START, GAME_PING_STOP
} from 'actions';
import { sendRequest } from 'utility/request-helpers.js';
import config from 'constants/config.js';

const getToken = state => state.common.playerToken;
const getGameId = state => (state.common.gameState || {}).id;

export function* createGame() {
    yield put({type: GAME_CREATE_STARTED});

    yield sendRequest({
        method: 'POST',
        url: config.GAME_RESOURCE_URL,
        onSuccess: function* success(data) {
            yield put({type: GAME_CREATE_COMPLETE, gameState: data});
            yield put({type: GAME_PING_START});
        },
        onFailure: function* failure(err) {
            console.log('Create game failed: ', err);
            yield put({type: GAME_CREATE_FAILURE, message: `Action failed: ${err.message || err}`});
        }
    });
}

export function* joinGameAttempt(action) {
    yield put({type: GAME_JOIN_ATTEMPT_STARTED});

    yield sendRequest({
        method: 'GET',
        url: `${config.GAME_RESOURCE_URL}/${action.gameId}`,
        onSuccess: function* success(data) {
            yield put({type: GAME_JOIN_ATTEMPT_COMPLETE, gameState: data});
        },
        onFailure: function* failure(err) {
            console.log('Join game failed: ', err);
            yield put({type: GAME_JOIN_ATTEMPT_FAILURE, message: `Action failed: ${err.message || err}`});
        }
    });
}

export function* joinGamePickPlayer(action) {
    yield put({type: GAME_JOIN_PICK_PLAYER_STARTED});

    yield sendRequest({
        method: 'POST',
        url: `${config.GAME_RESOURCE_URL}/${action.gameId}`,
        body: {playerChoice: action.playerChoice},
        onSuccess: function* success(data) {
            yield put({type: GAME_JOIN_PICK_PLAYER_COMPLETE, playerChoice: action.playerChoice, token: data.token});
            yield put({type: GAME_PING_START});
        },
        onFailure: function* failure(err) {
            console.log('Pick player failed: ', err);
            yield put({type: GAME_JOIN_PICK_PLAYER_FAILURE, message: `Action failed: ${err.message || err}`});
        }
    });
}

export function* makeGameMove(action) {
    yield put({type: GAME_MOVE_STARTED});

    let token = yield select(getToken);
    let id = yield select(getGameId);

    yield sendRequest({
        method: 'POST',
        url: `${config.GAME_RESOURCE_URL}/${id}/board`,
        body: {move: action.move, token: token},
        onSuccess: function* success(data) {
            yield put({type: GAME_MOVE_COMPLETE, gameState: data});
        },
        onFailure: function* failure(err) {
            console.log('Move failed: ', err);
            yield put({type: GAME_MOVE_FAILURE, message: `Action failed: ${err.message || err}`});
        }
    });
}

// Start all Sagas
export default function* rootSaga() {
    yield takeLatest(GAME_JOIN_ATTEMPT_BEGIN, joinGameAttempt);
    yield takeLatest(GAME_JOIN_PICK_PLAYER_BEGIN, joinGamePickPlayer);
    yield takeLatest(GAME_CREATE_BEGIN, createGame);
    yield takeLatest(GAME_MOVE_BEGIN, makeGameMove);
}
