import $ from 'superagent';

import config from '../../config/base';

const url = `${config.base_url}?printType=books&maxResults=${config.maxBooks}&q=`;

class Api {
	getBooks(book) {
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
