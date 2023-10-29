export default function Editor({
  $target,
  initialState = {
    title: '',
    content: '',
  },
  onEditing,
}) {
  const $editor = document.createElement('div');
  $editor.className = 'editor';
  $editor.innerHTML = `
  <input type="text" name="title" />
  <div name="content" contentEditable="true"></div>
  `;
  this.state = initialState;
  $target.appendChild($editor);

  this.setState = async (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = async () => {
    $editor.querySelector('[name=title]').value = this.state.title;
    $editor.querySelector('[name=content]').innerHTML = this.state.content;
  };

  $editor.querySelector('[name=title]').addEventListener('keyup', (e) => {
    const nextState = {
      ...this.state,
      title: e.target.value,
    };
    this.setState(nextState);
    onEditing(this.state);
  });

  const getCaret = (node) => {
    // // 커서 위치 옮기고 span태그 삭제하기
  };
  const $content = $editor.querySelector('[name=content]');

  $content.addEventListener('input', (e) => {
    const nextState = {
      ...this.state,
      content: e.target.innerHTML,
    };
    this.setState(nextState);

    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents($content);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    $content.focus();

    onEditing(this.state);
  });

  this.render();
}
