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

function setPaginationTotal(state, action) {
    return state.setIn(['ui', 'pagination', 'total'], action.payload)
}

function setPaginationActivePage(state, action) {
    return state.setIn(['ui', 'pagination', 'activePage'], action.payload)
}

function setSelectedBook(state, action) {
    return state.setIn(['data', 'selectedBook'], fromJS(action.payload))
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
        case constants.SET_PAGINATION_TOTAL:
          newState = setPaginationTotal(state, action);
          break;
        case constants.SET_PAGINATION_ACTIVE_PAGE:
          newState = setPaginationActivePage(state, action);
          break;
        case constants.SET_SELECTED_BOOK:
          newState = setSelectedBook(state, action);
          break;
        default:
          newState = state;
    }

    return newState;
}

export default coreReducer;
