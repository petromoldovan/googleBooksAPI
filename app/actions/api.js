import Api from '../lib/api';
import {
    setLoading,
    setBooks,
    setCustomError,
    setPaginationPages,
    setSelectedBook
} from './state';

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
                    dispatch(setCustomError({message: 'None of our books matched your request', status: '404'}));
                } else {
                    dispatch(setCustomError(''));
                }

                console.log("full response")
                console.log(resp)
                console.log("data")
                console.log(data)

                console.log("numberOfPages")
                console.log(numberOfPages)

                dispatch(setLoading(false));
            })
            .catch((err) => {
                dispatch(setCustomError(err));
                dispatch(setLoading(false));
            })
    }
}

export function getBookByID(id){
    return(dispatch) => {
        dispatch(setLoading(true));

        const api = new Api();
        api.getBookByID(id)
            .then((res)=>{
                console.log(res)
                dispatch(setSelectedBook(res));
                dispatch(setLoading(false));
            })
            .catch((err)=>{
                console.log(err)
                dispatch(setLoading(false));
            })
    }
}
