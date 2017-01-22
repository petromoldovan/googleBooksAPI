import $ from 'superagent';

import config from '../../config/base';


class Api {
	getBooks(data) {
        console.log(data)
		return this.request('get', `${config.base_url}?printType=books&maxResults=${config.maxBooks}&q=${data.searchValue}&startIndex=${data.startIndex}`)
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
