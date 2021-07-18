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

	static postData (url, body, headers = {}, toJson = true) {
		return fetch(url, {
			method: 'POST',
			headers,
			body
		})
			.then(response => {
				const passingStatuses = [200, 201];

				if (!passingStatuses.includes(response.status)) {
					throw `${response.status} ${response.statusText}`;
				}

				if (toJson) {
					return response.json();
				}

				return response;
		});
	}
}
