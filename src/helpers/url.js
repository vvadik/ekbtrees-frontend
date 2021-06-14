export const getUrlParamByKey = (key) => {
	const result = window.location.pathname.split('/').find(param => {
		return param.indexOf(`${key}=`) === 0;
	});

	return result || '';
}

export const getUrlParamValueByKey = (key) => {
	const param = getUrlParamByKey(key).split('=');
	return param[1] || '';
}
