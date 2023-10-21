export default function EditorBody({ $target, content, onEditing }) {
  const $editorBody = document.createElement('div');

  $target.appendChild($editorBody);
  $editorBody.innerHTML = `<input type="text" name="content" style="width:500px;height:500px" value="${content}">`;

  this.state = content;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $editorBody.querySelector('[name=content]').value = this.state;
  };
}
