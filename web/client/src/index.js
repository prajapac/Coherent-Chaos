import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import store from './store';

import MainContainer from 'containers/MainContainer';

ReactDOM.render(
    <Provider store={store}>
        <div className='app'>
            <MainContainer/>
        </div>
    </Provider>,
    document.getElementById('root')
);
