import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import coreReducer from './reducers';
import App from './App';


const loggerMiddleware = createLogger({
    stateTransformer: state => state.toJS()
});

const store = createStore(
    coreReducer,
    applyMiddleware(thunk, loggerMiddleware)
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App} />
        </Router>
    </Provider>,
    document.getElementById('app'));
