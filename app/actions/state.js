import constants from '../constants';


export function setLoading(bool) {
    return {
        type: constants.IS_LOADING,
        payload: bool
    }
}

export function setBooks(data) {
    return {
        type: constants.LOAD_BOOKS,
        payload: data
    }
}

export function setCustomError(err) {
    return {
        type: constants.SET_CUSTOM_ERROR,
        payload: err
    }
}
