import Api from '../lib/api';


export function getBooks() {
    return (dispatch) => {
        const api = new Api();
        api.getBooks()
            .then((resp) => {
                console.log("worked")
            })
            .catch((err) => {
                console.log(err)
            })
    }
}
