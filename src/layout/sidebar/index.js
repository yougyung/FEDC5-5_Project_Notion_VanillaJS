import CreateImg from '@asset/create.png';
import DocumentNav from '@component/sidebar/document-nav';
import './style.scss';
import { createElementWithClass, addEvent } from '@util/dom';
import { createDocument } from '@api/document';
import { push } from '@util/router';

export default function SideBar({ $target, initialState, handleState }) {
	const $sidebar = createElementWithClass('div', 'sidebar');
	$target.appendChild($sidebar);

	this.state = initialState;
	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};
	const documnentList = () => {
		const $documentList = $sidebar.querySelector('.sidebar__documentList');
		const { documentList, focusedDocumentId } = this.state;
		return documentList.map(
			(document) =>
				new DocumentNav({ $target: $documentList, initialState: document, handleState, focusedDocumentId })
		);
	};

	this.render = () => {
		$sidebar.innerHTML = `
		<div class="sidebar__info">   
			<span class="sidebar__info-emoji">👀</span>
			<span class="sidebar__info-text">유경 Notion</span>
		</div>
		<div class="sidebar__documentCreateBtn">
			<img src=${CreateImg} alt="createBtnRootImg" class="sidebar__documentCreateBtn-img"  />
			<span class="sidebar__documentCreateBtn-text"/>새 페이지</span>
		</div>
		<div class="sidebar__documentList" role="tabList"></div>
		`;

		if (this.state && this.state.documentList.length > 1) documnentList();
		addEvent($sidebar, 'sidebar__documentCreateBtn-img', 'click', this.handleClickCreate);
	};
	this.render();

	this.handleClickCreate = async () => {
		const resposne = await createDocument('문서 제목', null);
		handleState({
			focusedDocumentId: resposne.id,
			documentList: [
				...this.state.documentList,
				{
					id: resposne.id,
					title: resposne.title,
					documents: [],
				},
			],
		});
		push(`/documents/${resposne.id}`);
	};
}
