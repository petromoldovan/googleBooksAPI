import { fromJS } from 'immutable';

import constants from './constants';


function loadBooks(state, action) {
    return state.setIn(['data', 'books'], fromJS(action.payload))
}

function setLoadingState(state, action) {
    return state.setIn(['ui', 'isLoading'], action.payload)
}

function setCustomError(state, action) {
    return state.setIn(['ui', 'customError'], action.payload)
}

function coreReducer(state = fromJS({}), action) {
    let newState;

    switch(action.type) {
        case constants.LOAD_BOOKS:
          newState = loadBooks(state, action);
          break;
        case constants.IS_LOADING:
          newState = setLoadingState(state, action);
          break;
        case constants.SET_CUSTOM_ERROR:
          newState = setCustomError(state, action);
          break;
        default:
          newState = state;
    }

    return newState;
}

export default coreReducer;
