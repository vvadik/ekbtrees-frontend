import RequestService from "../../helpers/requests";

export const getTree = (id) => {
	return RequestService.getData(`https://ekb-trees-help.ru/api/tree/get/${id}`, {
		'Content-Type': 'application/json'
	});
}

export const getFilesByTree = (files) => {
	return Promise.all(files.map(file => {
		return RequestService.getData(`https://ekb-trees-help.ru/api/file/${file}`)
	}));
}

export const uploadFilesByTree = (id) => (files) => {
	return Promise.all(files.map(file => {
		const formData = new FormData();
		formData.append("file", file);

		return RequestService.postData(`/api/tree/attachFile/${id}`, formData);
	}))
};

export const getFilesByIds = (filesIds) => {
	return Promise.all(filesIds.map(id => {
		return RequestService.getData(`https://ekb-trees-help.ru/api/file/${id}`)
	}));
}
