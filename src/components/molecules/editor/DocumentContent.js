/*
 * DocumentContent
 * - Content : 문서 내용 (Editor)
 */

export default function DocumentContent({ $target, content, onEditing }) {
  this.state = content;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  const $content = document.createElement('div');
  $content.setAttribute('contenteditable', 'true');
  $content.style.width = '100%';
  $content.style.height = '90vh';

  $target.appendChild($content);

  $content.addEventListener('keyup', e => {
    const nextState = { ...this.state, title: e.target.value };
    this.setState(nextState);
    onEditing(this.state);
  });

  this.render = () => {
    $content.innerHTML = this.state;
  };
  this.render();
}
