import './style.scss';
import { createElementWithClass } from '../../util/dom';

export default function SideBar({ $target }) {
	const $sidebar = createElementWithClass('div', 'sidebar');

	$target.appendChild($sidebar);

	const notionTitle = () => {
		return `<div class="sidebar__info">   
			<div class="sidebar__info-emoji">👀</div>
			<div class="sidebar__info-text">유경 Notion</div>
		</div>`;
	};
	const documnentList = () => {
		return ``;
	};

	this.render = () => {
		$sidebar.innerHTML = `
			${notionTitle()}
			${documnentList()}
		`;
	};
	this.render();
}
