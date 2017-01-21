import Api from '../lib/api';
import {
    setLoading,
    setBooks,
    setCustomError
} from './state';


export function getBooks() {
    return (dispatch) => {
        dispatch(setLoading(true));

        const api = new Api();
        api.getBooks()
            .then((resp) => {
                console.log(resp)
                dispatch(setBooks(resp.items));
                dispatch(setLoading(false));
            })
            .catch((err) => {
                console.log(err)
                dispatch(setCustomError(err));
                dispatch(setLoading(false));
            })
    }
}
