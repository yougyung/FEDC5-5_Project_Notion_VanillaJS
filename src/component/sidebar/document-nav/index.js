import { createElementWithClass, addEvent } from '@util/dom';
import { createDocument } from '@api/document';
import CreateImg from '@asset/create.png';
import { push } from '@util/router';
import './style.scss';

export default function DocumentNav({ $target, initialState, handleState, focusedDocumentId }) {
	const $documentNav = createElementWithClass('div', 'document-nav');
	$target.appendChild($documentNav);
	this.state = {
		document: initialState,
		isToggleOn: false,
	};
	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};

	const documnentList = () => {
		const $children = $documentNav.lastElementChild;
		const { documents } = this.state.document;
		documents.map(
			(document) =>
				new DocumentNav({ $target: $children, initialState: document, handleState, focusedDocumentId })
		);
	};

	this.render = () => {
		const { document } = this.state;
		const isActive = document.id === Number(focusedDocumentId);
		$documentNav.innerHTML = `
		<div class="document-nav__item" role="tab" aria-selected=${isActive} style="${
			isActive && 'color:#37352f; background:rgba(0,0,0,0.04)'
		}">
			<div class="document-nav__item-info">
				<div class="document-nav__item-info__title">${document.title}</div>
			</div>
			<div class="document-nav__item-createBtn">
				<img src=${CreateImg} alt="createBtnImg" class="document-nav__item-createBtn-img icon"  />
			</div>
		</div>
		<div class="document-nav__children"></div>
		`;
		documnentList();
	};

	this.render();

	this.handleClickTitle = () => {
		const { id } = this.state.document;
		handleState({ focusedDocumentId: id });
		push(`/documents/${id}`);
	};
	this.handleClickAddBtn = async () => {
		const { id } = this.state.document;
		const response = await createDocument('제목 없음', id);
		handleState({ focusedDoscumentId: response.id });
	};

	addEvent($documentNav, 'document-nav__item-info__title', 'click', this.handleClickTitle);
	addEvent($documentNav, 'document-nav__item-createBtn', 'click', this.handleClickAddBtn);
}
