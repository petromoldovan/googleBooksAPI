import { fromJS } from 'immutable';

import constants from './constants';


function loadBooks(state, action) {
    return state.setIn(['data', 'books'], [])
}

function coreReducer(state = fromJS({}), action) {
    let newState;

    switch(action.type) {
        case constants.LOAD_BOOKS:
          newState = loadBooks(state, action);
          break;
        default:
          newState = state;
    }

    return newState;
}

export default coreReducer;
