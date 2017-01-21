import $ from 'superagent';

const url = 'https://www.googleapis.com/books/v1/volumes?printType=books&projection=lite&q=';

class Api {
	getBooks(book) {
        console.log(book)

		return this.request('get', `${url}${book}`)
	}

    request(method, url) {
        return new Promise((resolve, reject) => {
            const request = $[method](url).set('Accept', 'application/json');

            request
                .then(response => resolve(response.body))
                .catch(reject)
        })
    }
}

export default Api;
