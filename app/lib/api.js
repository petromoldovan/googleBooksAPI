import $ from 'superagent';

import config from '../../config/base';


class Api {
	getBooks(data) {
		return this.request('get', `${config.base_url}?printType=books&maxResults=${data.booksPerPage}&q=${data.searchValue}&startIndex=${data.startIndex}`);
	}

    getBookByID(id) {
        return this.request('get', `${config.base_url}/${id}`);
    }

    request(method, url) {
        return new Promise((resolve, reject) => {
            const request = $[method](url).set('Accept', 'application/json');

            request
                .then(response => resolve(response.body))
                .catch(reject);
        });
    }
}

export default Api;
