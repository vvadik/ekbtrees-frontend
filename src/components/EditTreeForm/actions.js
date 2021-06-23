import RequestService from "../../helpers/requests";
import {baseUrl} from '../ApiDataLoadHelper/DataLoadHelper'

export const getTree = (id) => {
	return RequestService.getData(`${baseUrl}tree/get/${id}`);
}

export const getFilesByTree = (files) => {
	return Promise.all(files.map(file => {
		return RequestService.getData(`${baseUrl}file/${file}`)
	}));
}

export const uploadFilesByTree = (id, files) => {
	return Promise.all(files.map(file => {
		const formData = new FormData();
		formData.append("file", file);

		return RequestService.postData(`${baseUrl}tree/attachFile/${id}`, formData);
	}))
};

export const getFilesByIds = (filesIds) => {
	return Promise.all(filesIds.map(id => {
		return RequestService.getData(`${baseUrl}file/${id}`)
	}));
}

export const getTypesOfTrees = () => {
	return RequestService.getData(`${baseUrl}species/get-all`)
}


export const editTree = (body) => {
	return RequestService.postData(`${baseUrl}tree/save`, JSON.stringify(body), {
		'Content-Type': 'application/json'
	})
}
