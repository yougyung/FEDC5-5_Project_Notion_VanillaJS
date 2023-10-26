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

	this.stateRecursion = (documentsArray, $parentElement, index) => {
		const $ul = document.createElement('ul');
		documentsArray.sort((a, b) => {
			a.createdAt - b.createdAt;
		});

		documentsArray.forEach(({ id, title, documents }) => {
			const $li = document.createElement('li');

			$li.setAttribute('data-id', id);
			$li.innerHTML = `<div class='tab_container'><button name='arrow'>${
				SVG_ARROW_DOWN
			}</button>
				<span class='text title_text'>${
					title ? title : EMPTY_TITLE
				}</span><button name='delete' class='hover_button'>${SVG_DELETE}</button><button name='add' class='hover_button'>${SVG_PLUS}</button></div>
			`;

			if (documents.length) {
				this.stateRecursion(documents, $li, index + 1);
			} else {
				$li.innerHTML += `<ul><li><span class="text not_exist">하위 페이지 없음</span></li></ul>`;
			}
			$ul.appendChild($li);
		});
		$parentElement.appendChild($ul);
	};

	this.render = () => {
		const $fragment = document.createDocumentFragment();

		this.stateRecursion(this.state, $fragment, 0);
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
