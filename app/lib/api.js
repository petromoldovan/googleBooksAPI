import $ from 'superagent';

const url = 'https://www.googleapis.com/books/v1/volumes?q=victor+hugo+miserables&printType=books&projection=lite'

class Api {


	getBooks() {
		return this.request('get', url)
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
