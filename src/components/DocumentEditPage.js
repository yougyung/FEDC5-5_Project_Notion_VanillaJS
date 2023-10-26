import { EMPTY_TITLE } from '../constants/messages.js';
export default function DocumentEditPage({
	$target,
	initialState,
	onPostChange,
}) {
	const $div = document.createElement('div');

	$div.setAttribute('class', 'edit_form');
	$target.appendChild($div);

	this.state = initialState;

	$div.innerHTML = `<input name='title'  style="margin-left: 84px" placeholder='${EMPTY_TITLE}'></input><div name="content" contentEditable="true" style="width:600px;height:400px; margin-left: 84px; border= 1px solid black; padding:8px; outline:none;"></div>`;
	const $input = document.querySelector(`input[name='title']`);
	const $divContent = document.querySelector(`div[name='content']`);

	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};

	const $input = document.querySelector(`input[name='title']`);
	const $textarea = document.querySelector(`textarea[name='content']`);

	this.render = () => {
		const { id, title, content, documents, createdAt, updatedAt } =
			this.state;
		$input.value = title ? title : '';
		$divContent.innerHTML = content
			? JSON.parse(content)
					.map(({ tag, content }) => `<${tag}>${content}</${tag}>`)
					.join('')
			: '';
	};
	this.render();

	$input.addEventListener('input', (event) => {
	});

	$textarea.addEventListener('change', (event) => {});
}
