import { updateDocument } from '@api/document';
import debounce from '@util/debounce';
import { createElementWithClass, addEvent } from '../../util/dom';
import './style.scss';

export default function Document({ $target, initialState, handleOptimisticUITitle }) {
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
		addEvent($document, 'document__title', 'keyup', this.handleKeyUpTitle);
		addEvent($document, 'document__content', 'keyup', this.handleKeyUpContent);
	};
	this.render();

	this.handleKeyUpTitle = (e) => {
		const { id, content } = this.state;
		// optimistic UI
		handleOptimisticUITitle(id, e.target.innerHTML);

		// handleState();
		debounce(async () => {
			const newDocument = { title: e.target.innerHTML, content };
			await updateDocument(newDocument, id);
		});
	};
	this.handleKeyUpContent = (e) => {
		debounce(async () => {
			const { id, title } = this.state;
			const newDocument = { title, content: e.target.innerHTML };
			await updateDocument(newDocument, id);
		});
	};
}
