import RequestService from "../helpers/requests";

export const getMyTrees = async () => {
	return await RequestService.getData('https://ekb-trees-help.ru/api/tree/get', {
		'Content-Type': 'application/json'
	})
}