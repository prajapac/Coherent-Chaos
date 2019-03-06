import { delay } from 'redux-saga/effects';

export function* testSaga() { // TODO: Remove
    while (true) {
        console.log('Sagas are working'); // eslint-disable-line
        yield delay(5000);
    }
}

// TODO: Long polling
// Long polling example
// https://gist.github.com/markerikson/5203e71a69fa9dff203c9e27c3d84154
export default function* watchSagaPing() {
    yield testSaga();
}
