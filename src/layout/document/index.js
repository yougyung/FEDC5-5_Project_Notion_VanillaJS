import { updateDocument } from '@api/document';
import debounce from '@util/debounce';
import ContentBlock from '@component/document/content-block';
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
	this.parseContent = () => {
		const htmlString = this.state.content;
		const pattern = /<(\w+)[^>]*>([^<]+)<\/\1>/g;
		let match;
		const parsed = [];
		// eslint-disable-next-line no-cond-assign
		while ((match = pattern.exec(htmlString)) !== null) {
			const tagName = match[1];
			const innerText = match[2].trim();
			parsed.push({ tagName, innerText });
		}
		return parsed;
	};

	const test = () => {
		const $contentBox = $document.querySelector('.document__content');
		const elements = this.parseContent();
		elements.map((element) => new ContentBlock({ $target: $contentBox, initialState: element }));
	};

	this.render = () => {
		const { title } = this.state;
		$document.innerHTML = `
		<h1 contenteditable="true" class="document__title">${title}</h1>
		<div class="document__content"></div>
		`;
		test();
		addEvent($document, 'document__title', 'keyup', this.handleKeyUpTitle);
		addEvent($document, 'document__content', 'click', this.handleClickContent);
		addEvent($document, 'document__content', 'keyup', this.handleKeyUpContent);
	};
	this.render();

	this.handleKeyUpTitle = (e) => {
		const { id, content } = this.state;
		// optimistic UI
		handleOptimisticUITitle(id, e.target.innerHTML);
		// api update
		debounce(async () => {
			const newDocument = { title: e.target.innerHTML, content };
			await updateDocument(newDocument, id);
		});
	};
	this.handleKeyUpContent = (e) => {
		const $contentBox = $document.querySelector('.document__content');

		debounce(async () => {
			const { id, title } = this.state;
			const newDocument = { title, content: $contentBox.innerHTML };
			await updateDocument(newDocument, id);
		});
	};
	this.handleClickContent = () => {
		const $contentBox = $document.querySelector('.document__content');
		const init = {
			tagName: 'div',
			innerText: '### test입',
		};
		// new ContentBlock({ $target: $contentBox, initialState: init });
	};
}
