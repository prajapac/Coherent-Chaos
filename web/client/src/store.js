import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import rootSaga from 'sagas';
import pingSaga from 'sagas/ping.js';
import reducer from 'reducers';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
sagaMiddleware.run(pingSaga);

export default store;
