export const closest = (element, selector) => {
	const body = document.body;
	let matchesFn = '';

	if (body['matches'] && typeof body['matches'] === 'function') {
		matchesFn = 'matches';
	} else if (body['msMatchesSelector'] && typeof body['msMatchesSelector'] === 'function') {
		matchesFn = 'msMatchesSelector';
	}

	let parent;

	if (matchesFn) {
		if (element[matchesFn](selector)) {
			return [element];
		}

		parent = element.parentElement;

		while (parent) {
			if (parent[matchesFn](selector)) {
				return [parent];
			}

			parent = parent.parentElement;
		}
	}

	return [];
};
