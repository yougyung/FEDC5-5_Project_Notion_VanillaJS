import './style.scss';

const $target = document.querySelector('#app');

function render() {
	const $div = document.createElement('div');
	$div.innerHTML = 'test화면입니다.';
	$target.append($div);
}
render();
