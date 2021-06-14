import dayjs from 'dayjs';

export const formatDate = (
	timestamp,
	format = 'DD.MM.YYYY HH:mm:ss'
) => {
	const date = new Date(timestamp);
	return dayjs(date).format(format);
};
