export default function EditorHeader({ $target, title, onEditing }) {
  const $editorHeader = document.createElement('div');
  const $titleContainer = document.createElement('div');
  const $statusContainer = document.createElement('div');
  const $removeContainer = document.createElement('div');

  $target.appendChild($editorHeader);
  $editorHeader.appendChild($titleContainer);

  $titleContainer.innerHTML = `
  <input type="text" name="title" style="width:500px" value="${title}">`;

  this.state = title;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $titleContainer.querySelector('[name=title]').value = this.state;
  };

  $titleContainer
    .querySelector('[name=title]')
    .addEventListener('keyup', (e) => {
      const nextState = e.target.value;
      this.setState(nextState);

      onEditing(this.state);
    });

  this.render();
}
