import { put, takeLatest, delay } from 'redux-saga/effects';
import {
    GAME_CREATE_BEGIN, GAME_CREATE_STARTED, GAME_CREATE_COMPLETE, GAME_CREATE_FAILURE,
    GAME_JOIN_ATTEMPT_BEGIN, GAME_JOIN_ATTEMPT_STARTED, GAME_JOIN_ATTEMPT_COMPLETE, GAME_JOIN_ATTEMPT_FAILURE,
    GAME_JOIN_PICK_PLAYER_BEGIN, GAME_JOIN_PICK_PLAYER_STARTED, GAME_JOIN_PICK_PLAYER_COMPLETE, GAME_JOIN_PICK_PLAYER_FAILURE
} from 'actions';
import config from 'constants/config.js';

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
            console.log(data.message);
            yield put({type: GAME_CREATE_FAILURE, error: true, message: data.message});
        }
    } catch (err) {
        console.log(err);
        yield put({type: GAME_CREATE_FAILURE, error: true, message: 'Failed to connect to Coherent Chaos'});
    }
}

export function* joinGameAttempt(action) {
    yield put({type: GAME_JOIN_ATTEMPT_STARTED});

    try {
        let res = yield fetch(
            `${config.GAME_RESOURCE_URL}/${action.gameId}`,
            {
                method: 'GET'
            }
        );

        let data = yield res.json();

        if (res.ok && !data.failure) {
            yield put({type: GAME_JOIN_ATTEMPT_COMPLETE, gameState: data});
        } else {
            console.log(data.message);
            yield put({type: GAME_JOIN_ATTEMPT_FAILURE, error: true, message: data.message});
        }
    } catch (err) {
        console.log(err);
        yield put({type: GAME_JOIN_ATTEMPT_FAILURE, error: true, message: 'Failed to connect to Coherent Chaos'});
    }
}

export function* joinGamePickPlayer(action) {
    yield put({type: GAME_JOIN_PICK_PLAYER_STARTED});

    try {
        let res = yield fetch(
            `${config.GAME_RESOURCE_URL}/${action.gameId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({playerChoice: action.playerChoice})
            }
        );

        let data = yield res.json();

        if (res.ok && !data.failure) {
            yield put({type: GAME_JOIN_PICK_PLAYER_COMPLETE, playerChoice: action.playerChoice, token: data.token});
        } else {
            console.log(data.message);
            yield put({type: GAME_JOIN_PICK_PLAYER_FAILURE, error: true, message: data.message});
        }
    } catch (err) {
        console.log(err);
        yield put({type: GAME_JOIN_PICK_PLAYER_FAILURE, error: true, message: 'Failed to connect to Coherent Chaos'});
    }
}

// Start all Sagas
export default function* rootSaga() {
    yield takeLatest(GAME_JOIN_ATTEMPT_BEGIN, joinGameAttempt);
    yield takeLatest(GAME_JOIN_PICK_PLAYER_BEGIN, joinGamePickPlayer);
    yield takeLatest(GAME_CREATE_BEGIN, createGame);
}
