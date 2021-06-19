import RequestService from "../../helpers/requests";
import {baseUrl} from "../ApiDataLoadHelper/DataLoadHelper";

export const addTree = (body) => {
	return RequestService.postData(`${baseUrl}tree/save`, JSON.stringify(body), {
		'Content-Type': 'application/json'
	})
}

export const uploadFiles = (files) => {
	return Promise.all(files.map(file => {
		const formData = new FormData();
		formData.append("file", file);

		return RequestService.postData(`${baseUrl}file/upload`, formData);
	}))
};
