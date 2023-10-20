export default function DocumentList({ $target, initialState }) {
	const $nav = document.createElement('nav');

	$target.appendChild($nav);

	this.state = initialState;
	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};
	this.render = () => {
	};
	this.render();
}
