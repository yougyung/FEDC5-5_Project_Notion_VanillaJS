export const createElementWithClass = (tagName, className) => {
	const $dom = document.createElement(tagName);
	$dom.classList.add(className);
	return $dom;
};
