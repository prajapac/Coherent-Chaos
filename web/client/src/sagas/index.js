import { put, takeLatest, delay } from 'redux-saga/effects';
import {
    GAME_JOIN_BEGIN, GAME_JOIN_STARTED, GAME_JOIN_COMPLETE, GAME_JOIN_FAILURE,
    GAME_CREATE_BEGIN, GAME_CREATE_STARTED, GAME_CREATE_COMPLETE, GAME_CREATE_FAILURE
} from 'actions';
import config from 'constants/config.js';

export function* joinGame(action) { // TODO: Real network calls
    console.log('Called joinGame', action.gameId); // eslint-disable-line

    yield put({type: GAME_JOIN_STARTED});
    yield delay(2000);
    yield put({type: GAME_JOIN_COMPLETE});
}

export function* createGame() {
    yield put({type: GAME_CREATE_STARTED});

    try {
        let res = yield fetch(
            config.GAME_RESOURCE_URL,
            {
                method: 'POST'
            }
        );

        let data = yield res.json();

        if (res.ok && !data.failure) {
            yield put({type: GAME_CREATE_COMPLETE, gameState: data});
        } else {
            yield put({type: GAME_CREATE_FAILURE, error: true, message: data.message});
        }
    } catch (err) {
        console.log(err);
        yield put({type: GAME_CREATE_FAILURE, error: true, message: 'Failed to connect to Coherent Chaos'});
    }
}

// Start all Sagas
export default function* rootSaga() {
    yield takeLatest(GAME_JOIN_BEGIN, joinGame);
    yield takeLatest(GAME_CREATE_BEGIN, createGame);
}
