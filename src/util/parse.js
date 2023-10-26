const editContentBlock = (target, type) => {
	const selection = window.getSelection();
	const { anchorOffset, focusOffset, focusNode } = selection;
	const targetText = focusNode.data.substring(anchorOffset, focusOffset);
	const relaceText = target.innerHTML;
	const $newInnerHTML = relaceText.replace(targetText, `<${type}>${targetText}</${type}>`);
	target.innerHTML = $newInnerHTML;
};
export default editContentBlock;
