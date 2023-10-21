import DocumentNav from '../../component/sidebar/document-nav';
import './style.scss';
import { createElementWithClass } from '../../util/dom';

export default function SideBar({ $target, initialState }) {
	const $sidebar = createElementWithClass('div', 'sidebar');
	$target.appendChild($sidebar);

	this.state = initialState;

	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};

	const notionTitle = () => {
		return `<div class="sidebar__info">   
			<div class="sidebar__info-emoji">👀</div>
			<div class="sidebar__info-text">유경 Notion</div>
		</div>`;
	};

	const documnentList = () => {
		return this.state.map((document) => new DocumentNav({ $target: $sidebar, initialState: document }));
	};

	this.render = () => {
		$sidebar.innerHTML = `
			${notionTitle()}
		`;
		documnentList();
	};
	this.render();
}
