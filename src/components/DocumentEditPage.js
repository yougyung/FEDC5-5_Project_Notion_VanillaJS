import { EMPTY_TITLE } from '../constants/messages.js';
export default function DocumentEditPage({
	$target,
	initialState,
}) {
	const $div = document.createElement('div');

	$div.setAttribute('class', 'edit_form');
	$target.appendChild($div);

	this.state = initialState;

	$div.innerHTML = `<input name='title' placeholder=''></input><textarea name='content'></textarea>`;

	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};

	const $input = document.querySelector(`input[name='title']`);
	const $textarea = document.querySelector(`textarea[name='content']`);

	this.render = () => {
		const { id, title, content, documents, createdAt, updatedAt } =
			this.state;

		if (title) {
			$input.value = title;
		} else {
			$input.placeholder = EMPTY_TITLE;
		}
		$textarea.value = content ? content : '';
	};
	this.render();

	$input.addEventListener('input', (event) => {
	});

	$textarea.addEventListener('change', (event) => {});
}
