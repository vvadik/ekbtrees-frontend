import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class RequestService {
	static getData (url, headers = {}) {
		const token = cookies.get('AccessToken');

		return fetch(url, {
			method: 'GET',
			headers: {
				...headers,
				'Authorization': `Bearer ${token}`
			},
		})
			.then(response => {
				if (response.status !== 200) {
					throw `${response.status} ${response.statusText}`;
				}

				return response.json();
			});
	}

	static postData (url, body, headers = {}) {
		const token = cookies.get('AccessToken');

		return fetch(url, {
			method: 'POST',
			headers: {
				...headers,
				'Authorization': `Bearer ${token}`
			},
			body
		})
			.then(response => {
				const passingStatuses = [200, 201];

				if (!passingStatuses.includes(response.status)) {
					throw `${response.status} ${response.statusText}`;
				}

				return response.json()
		})
	}
}
