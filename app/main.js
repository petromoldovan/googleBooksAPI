import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import coreReducer from './reducers';
import App from './containers/App';
import Landing from './containers/pages/Landing';
import Details from './containers/pages/Details';


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
            <Route path="/" component={App} >
                <IndexRoute component={Landing} />
                <Route path="/:id" component={Details} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app'));
