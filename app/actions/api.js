import Api from '../lib/api';
import {
    setLoading,
    setBooks,
    setCustomError,
    setPaginationPages,
    setSelectedBook
} from './state';
import {errors} from '../constants';


export function getBooks(data) {
    return (dispatch) => {
        dispatch(setLoading(true));

        const api = new Api();
        api.getBooks(data)
            .then((resp) => {
                if (resp.items) dispatch(setBooks(resp.items));

                const numberOfPages = Math.ceil(resp.totalItems / data.booksPerPage);
                dispatch(setPaginationPages(numberOfPages));

                /*handle errors*/
                if (numberOfPages === 0) {
                    dispatch(setCustomError({message: errors.NO_BOOKS_FOUND, status: '404'}));
                } else {
                    dispatch(setCustomError(''));
                }

                dispatch(setLoading(false));
            })
            .catch((err) => {
                dispatch(setCustomError(err));
                dispatch(setLoading(false));
            });
    };
}

export function getBookByID(id) {
    return (dispatch) => {
        dispatch(setLoading(true));

        const api = new Api();
        api.getBookByID(id)
            .then((res)=>{
                dispatch(setSelectedBook(res));
                dispatch(setLoading(false));
            })
            .catch(()=>{
                dispatch(setLoading(false));
            });
    };
}
