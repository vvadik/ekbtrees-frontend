export default class RequestService {
	static getData (url, headers = {}) {
		return fetch(url, {
			method: 'GET',
			headers
		})
			.then(response => {
				if (response.status !== 200) {
					throw `${response.status} ${response.statusText}`;
				}

				return response.json();
			});
	}

	static postData (url, body, headers = {}) {
		return fetch(url, {
			method: 'POST',
			headers,
			body
		})
			.then(response => {
			if (response.status !== 200 || response.status !== 201) {
				throw `${response.status} ${response.statusText}`;
			}

			return response.json()
		})
	}
}
