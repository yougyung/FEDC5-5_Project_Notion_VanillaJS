import { createElementWithClass } from '@util/dom';
import './style.scss';
import ArrowImg from '@asset/arrow.png';

export default function DocumentNav({ $target, initialState }) {
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
			this.state.document.documents.map(
				(document) => new DocumentNav({ $target: $children, initialState: document })
			);
		}
	};

	this.render = () => {
		const { document } = this.state;
		$documentNav.innerHTML = `
		<div class="document-nav__item">
			<div class="document-nav__item-toggle">
				<img src=${ArrowImg} alt="toggleImg" class="document-nav__toggle-img" />
			</div>
			<div class="document-nav__item-title">${document.title}</div>
		</div>
		<div class="document-nav__children"></div>
		`;
		documnentList();
	};

	this.render();

	const $children = $documentNav.querySelector('.document-nav__item-toggle');
	console.log($children);
	$children.addEventListener('click', () => this.setState({ ...this.state, isToggleOn: !this.state.isToggleOn }));
}
