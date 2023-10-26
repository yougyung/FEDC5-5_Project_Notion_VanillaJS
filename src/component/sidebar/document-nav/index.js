import { createElementWithClass, addEvent } from '@util/dom';
import { createDocument } from '@api/document';
import ArrowImg from '@asset/arrow.png';
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
		if (this.state.isToggleOn) {
			const $children = $documentNav.lastElementChild;
			const { documents } = this.state.document;
			if (documents.length === 0) {
				$children.innerHTML = `<span class="document-nav__children-announce">하위 페이지 없음</span>`;
			}
			documents.map((document) => new DocumentNav({ $target: $children, initialState: document }));
		}
	};

	this.render = () => {
		const { document } = this.state;
		const isActive = document.id === Number(focusedDocumentId);
		$documentNav.innerHTML = `
		<div class="document-nav__item" role="tab" aria-selected=${isActive} style="${
			isActive && 'color:#37352f; background:rgba(0,0,0,0.04)'
		}">
			<div class="document-nav__item-info">
				<div class="document-nav__item-info__toggle">
					<img src=${ArrowImg} alt="toggleBtnImg" class="document-nav__item-toggle-img" />
				</div>
				<div class="document-nav__item-info__title">${document.title}</div>
			</div>
			<div class="document-nav__item-createBtn">
				<img src=${CreateImg} alt="toggleBtnImg" class="document-nav__item-createBtn-img icon"  />
			</div>
		</div>
		<div class="document-nav__children"></div>
		`;
		documnentList();
	};

	this.render();

	const handleClickTitle = () => {
		const { id } = this.state.document;
		handleState({ focusedDocumentId: id });
		push(`/documents/${id}`);
	};
	const handleClickAddBtn = async () => {
		const { id } = this.state.document;
		const response = await createDocument('제목 없음', id);
		handleState({ focusedDoscumentId: response.id });
	};
	const handleClickToggle = () => {
		this.setState({ ...this.state, isToggleOn: !this.state.isToggleOn });
	};

	addEvent($documentNav, 'document-nav__item-info__toggle', 'click', handleClickToggle);
	addEvent($documentNav, 'document-nav__item-info__title', 'click', handleClickTitle);
	addEvent($documentNav, 'document-nav__item-createBtn', 'click', handleClickAddBtn);
}
