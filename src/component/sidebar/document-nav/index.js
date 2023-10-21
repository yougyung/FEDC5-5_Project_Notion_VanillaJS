import { createElementWithClass, addEvent } from '@util/dom';
import { createDocument } from '@api/document';
import ArrowImg from '@asset/arrow.png';
import CreateImg from '@asset/create.png';
import './style.scss';

export default function DocumentNav({ $target, initialState, handleState }) {
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
		$documentNav.innerHTML = `
		<div class="document-nav__item">
			<div class="document-nav__item-info">
				<div class="document-nav__item-info__toggle">
					<img src=${ArrowImg} alt="toggleImg" class="document-nav__item-toggle-img" />
				</div>
				<div class="document-nav__item-info__title">${document.title}</div>
			</div>
			<div class="document-nav__item-createBtn">
				<img src=${CreateImg} alt="toggleImg" class="document-nav__item-createBtn-img icon"  />
			</div>
		</div>
		<div class="document-nav__children"></div>
		`;
		documnentList();
	};

	this.render();

	const handleClickTitle = () => {
		const { document } = this.state;
		handleState({ focusedDocumentId: document.id });
	};
	const handleClickAddBtn = async () => {
		const response = await createDocument('제목 없음', this.state.document.id);
		handleState({ focusedDocumentId: response.id });
	};
	const handleClickToggle = () => {
		this.setState({ ...this.state, isToggleOn: !this.state.isToggleOn });
	};

	addEvent($documentNav, 'document-nav__item-info__toggle', 'click', handleClickToggle);
	addEvent($documentNav, 'document-nav__item-info__title', 'click', handleClickTitle);
	addEvent($documentNav, 'document-nav__item-createBtn', 'click', handleClickAddBtn);
}
