import { put, take, delay, select, race, call } from 'redux-saga/effects';
import {
    GAME_CREATE_COMPLETE, GAME_JOIN_PICK_PLAYER_COMPLETE, GAME_EXIT,
    GAME_PING_START, GAME_PING_FAILURE, GAME_PING_SUCCESS
} from 'actions';
import { sendRequest } from 'utility/request-helpers.js';
import config from 'constants/config.js';

const getToken = state => state.common.playerToken;
const getGameId = state => (state.common.gameState || {}).id;

function* pingWorker() {
    while (true) {

        yield delay(config.GAME_PING_INTERVAL_MILLISECONDS);

        let token = yield select(getToken);
        let id = yield select(getGameId);

        yield sendRequest({
            method: 'PATCH',
            url: `${config.GAME_RESOURCE_URL}/${id}`,
            body: {token: token},
            onSuccess: function* success(data) {
                console.log('Ping success', id, token);
                yield put({type: GAME_PING_SUCCESS, gameState: data});
            },
            onFailure: function* failure(err) {
                console.log('Ping game failed: ', err);
                yield put({type: GAME_PING_FAILURE, message: `Failed to connect to Coherent Chaos: ${err}`});
            }
        });
    }
}

export default function* pingWatcher() {
    while (true) {
        yield take(GAME_PING_START);
        yield race([
            call(pingWorker),
            take([GAME_EXIT, GAME_PING_FAILURE])
        ]);
    }
}
