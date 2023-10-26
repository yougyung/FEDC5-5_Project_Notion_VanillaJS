import { EMPTY_TITLE } from '../constants/messages.js';
import { getItem, setItem } from '../storage.js';
import { SVG_ARROW_DOWN, SVG_PLUS, SVG_DELETE } from '../constants/index.js';
export default function DocumentList({
	$target,
	initialState,
	onTitleClick,
	onCreatePage,
	onDeletePage,
}) {
	const $div = document.createElement('div');
	const $divCreateNewDocument = document.createElement('div');
	const $divListContainer = document.createElement('div');

	$div.setAttribute('class', 'list_container');
	$divListContainer.setAttribute('class', 'li_container');
	$div.appendChild($divListContainer);
	$target.appendChild($div);

	this.state = initialState;

	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};

	this.stateRecursion = (documentsArray, $parentElement) => {
		const $ul = document.createElement('ul');
		documentsArray.sort((a, b) => {
			a.createdAt - b.createdAt;
		});

		documentsArray.forEach(({ id, title, documents }) => {
			const $li = document.createElement('li');

			$li.setAttribute('data-id', id);
			$li.innerHTML = `
				<span>${title ? title : EMPTY_TITLE}<span><button>+</button>
			`;

			if (documents.length) this.stateRecursion(documents, $li);
			$ul.appendChild($li);
		});
		$parentElement.appendChild($ul);
	};

	this.render = () => {
		const $fragment = document.createDocumentFragment();

		this.stateRecursion(this.state, $fragment);
		$divListContainer.appendChild($fragment);
	};
	this.render();

	$divListContainer.addEventListener('click', (event) => {
		const { target } = event;

		if (target.tagName !== 'SPAN') return;

		const { id } = target.closest('li').dataset;
		onTitleClick(id);
	});

	$divCreateNewDocument.addEventListener('click', (event) => {
		const { target } = event;
		if (target.tagName !== 'SPAN') return;
		onCreatePage();
	});
}
