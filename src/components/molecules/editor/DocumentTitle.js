/*
 * DocumentTitle
 * - Title : 문서 제목 (Editor)
 */

export default function DocumentTitle({ $target, title, onEditTitle }) {
  const $title = document.createElement('input');
  $title.style.width = '60%';
  $title.style.height = '50px';
  $title.style.fontSize = '30px';
  $title.setAttribute('placeholder', title || '제목을 입력하세요.');
  $target.appendChild($title);

  this.state = title;
  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  $title.addEventListener('keyup', e => {
    const nextTitle = e.target.value;
    onEditTitle(nextTitle);
  });

  this.render = () => {
    $title.value = this.state;
  };
  this.render();
}
