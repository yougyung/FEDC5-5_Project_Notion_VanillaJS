export default function Editor({ $target, initialState }) {
  const $editor = document.createElement('textarea');
  $editor.setAttribute('id', 'editor');
  $editor.setAttribute('name', 'text');

  this.state = initialState;

  this.setState = (nextState) => {
    const { selectedDoc } = nextState;

    this.state = selectedDoc.content;

    this.render();
  };

  this.render = () => {
    // 선택한 문서 content 값 표시

    if (!this.state) {
      $editor.remove();
    } else {
      $target.appendChild($editor);
    }

    $editor.value = !this.state ? '' : `${this.state}`;
  };

  this.render();
}
