import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootSaga from 'sagas';
import pingSaga from 'sagas/ping.js';
import reducer from 'reducers';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
);

sagaMiddleware.run(rootSaga);
sagaMiddleware.run(pingSaga);

export default store;
