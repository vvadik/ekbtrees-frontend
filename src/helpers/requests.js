export default class RequestService {
	static async getData (url, headers = {}) {
		return (await fetch(url, {
			method: 'GET',
			headers
		})).json();
	}

	static async postData (url, body, headers = {}) {
		return (await fetch(url, {
			method: 'POST',
			headers,
			body
		})).json()
	}
}
