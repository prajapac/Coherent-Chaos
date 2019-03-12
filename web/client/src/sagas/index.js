import { put, takeLatest, delay } from 'redux-saga/effects';
import { GAME_JOIN_BEGIN, GAME_JOIN_STARTED, GAME_JOIN_COMPLETE, GAME_CREATE_BEGIN, GAME_CREATE_STARTED, GAME_CREATE_COMPLETE } from 'actions';

export function* joinGame(action) { // TODO: Real network calls
    console.log('Called joinGame', action.gameId); // eslint-disable-line

    yield put({type: GAME_JOIN_STARTED});
    yield delay(2000);
    yield put({type: GAME_JOIN_COMPLETE});
}

export function* createGame() { // TODO: Real network calls
    console.log('Called createGame'); // eslint-disable-line

    yield put({type: GAME_CREATE_STARTED});
    yield delay(1000);
    yield put({type: GAME_CREATE_COMPLETE});
}

// Start all Sagas
export default function* rootSaga() {
    yield takeLatest(GAME_JOIN_BEGIN, joinGame);
    yield takeLatest(GAME_CREATE_BEGIN, createGame)
}
