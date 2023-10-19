export default function Document({ $target }) {
	const $div = document.createElement('div');

	$target.appendChild($div);
	this.render = () => {
		$div.innerHTML = 'docunemt';
	};
	this.render();
}
