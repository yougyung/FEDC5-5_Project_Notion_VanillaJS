import { updateDocument } from '@api/document';
import debounce from '@util/debounce';
import { createElementWithClass, addEvent } from '../../util/dom';
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

	const handleKeyUpContent = (e) => {
		// content의 저장은 의존성이 전혀존재하지않음
		debounce(async () => {
			const { id, title } = this.state;
			const newDocument = { title, content: e.target.innerHTML };
			await updateDocument(newDocument, id);
		});
	};
	addEvent($document, 'document__content', 'keyup', handleKeyUpContent);
}
