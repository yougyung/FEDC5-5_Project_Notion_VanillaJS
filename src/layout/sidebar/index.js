import DocumentNav from '../../component/sidebar/document-nav';
import './style.scss';
import { createElementWithClass } from '../../util/dom';

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
		<div class="sidebar__documentList" role="tabList"></div>
		`;

		if (this.state && this.state.documentList.length > 1) documnentList();
	};
	this.render();
}
