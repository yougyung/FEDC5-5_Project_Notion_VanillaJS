import { createElementWithClass } from '@util/dom';
import { parsedTagType } from '@util/tag';
import './style.scss';

const TRIGGER_CHARACTER = 'Space';

export default function ContentBlock({ $target, initialState }) {
	const $content = createElementWithClass(initialState.tagName ?? 'div', 'content-block');
	$content.setAttribute('contenteditable', true);
	$target.appendChild($content);
	this.getElement = () => $content;

	this.state = initialState;
	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};

	this.render = () => {
		$content.innerHTML = `${
			this.state.innerText.length === 0
				? `<div class="content-block__placeholder">글자를 입력해주세요.</div>`
				: this.state.innerText
		}`;

		$content.addEventListener('keyup', (e) => {
			this.handleKeyUpContentBlock(e);
		});
	};

	this.handleKeyUpContentBlock = (e) => {
		if (TRIGGER_CHARACTER === e.code) {
			const tag = $content.innerHTML.split(' ')[0];
			const isParsedTag = tag in parsedTagType;
			const init = { tagName: parsedTagType[tag], innerText: $content.innerHTML.slice(tag.length).trim() };
			if (isParsedTag) {
				const $newContent = new ContentBlock({ $target, initialState: init });
				$content.parentNode.replaceChild($newContent.getElement(), $content);
			}
		}
	};

	this.render();
}
