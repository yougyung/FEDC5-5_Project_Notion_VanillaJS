export default function Header({ $target, initialState }) {
	const $div = document.createElement('div');

	this.state = initialState;

	$target.appendChild($div);
	$div.innerHTML = `<p style="padding-left:12px;">${this.state}</p>`;
}
