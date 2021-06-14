import RequestService from "../../helpers/requests";

export const getTree = async (id) => {
	return await RequestService.getData(`https://ekb-trees-help.ru/api/tree/get/${id}`, {
		'Content-Type': 'application/json'
	});
}
