import { createElementWithClass } from '../../util/dom';
import './style.scss';

export default function Document({ $target, initialState }) {
	const $document = createElementWithClass('div', 'document');
	$target.appendChild($document);

	this.state = initialState;
	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};

	this.render = () => {
		const { title, content } = this.state;
		$document.innerHTML = `
		<h1 contenteditable="true" class="document__title">${title}</h1>
		<div contenteditable="true" class="document__content">${content}</div>
		`;
	};
	this.render();
}
