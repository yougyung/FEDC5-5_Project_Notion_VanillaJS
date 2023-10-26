import { EMPTY_TITLE } from '../constants/messages.js';

export default function Breadcrumb({
	$target,
	initialState,
	onBreadcrumbItemClick,
}) {
	const $p = document.createElement('p');

	$p.setAttribute('class', 'breadcrumb header');
	$target.appendChild($p);

	this.state = initialState;

	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};

	this.render = () => {
	this.render();

}
