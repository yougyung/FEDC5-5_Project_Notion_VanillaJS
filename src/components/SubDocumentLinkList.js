import { EMPTY_TITLE } from '../constants/messages.js';
import { SVG_DOCUMENT } from '../constants/index.js';

export default function SubDocumentLinkList({
	$target,
	initialState = [],
	onSubDocumentLinkClick,
}) {
	this.state = initialState;

	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};

	const $ul = document.createElement('ul');

	$target.appendChild($ul);
	$ul.setAttribute('class', 'sub_document_ul');

	this.render = () => {
	};


	this.render();
}
