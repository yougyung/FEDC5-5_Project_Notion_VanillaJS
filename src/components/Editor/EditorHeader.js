export default function EditorHeader({
  $target,
  initialState,
  onEditing,
  onRemoveDocument,
}) {
  const $editorHeader = document.createElement('div');
  const $titleContainer = document.createElement('div');
  const $statusContainer = document.createElement('div');
  const $removeContainer = document.createElement('div');

  $target.appendChild($editorHeader);
  $editorHeader.appendChild($titleContainer);
  $editorHeader.appendChild($removeContainer);

  $titleContainer.innerHTML = `
  <input type="text" name="title" style="width:500px" value="">`;

  $statusContainer.innerHTML = `
  <i class="fa fa-spinner"></i>
  <i class="fa fa-check"></i>`;

  $removeContainer.innerHTML = `
  <i class="fa fa-trash remove-button"></i>`;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state) {
      const { title } = this.state;
      $titleContainer.querySelector('[name=title]').value = title;
    }
  };

  $titleContainer
    .querySelector('[name=title]')
    .addEventListener('keyup', (e) => {
      const nextState = { ...this.state, title: e.target.value };
      this.setState(nextState);

      onEditing(this.state);
    });

  $removeContainer
    .querySelector('.remove-button')
    .addEventListener('click', () => {
      onRemoveDocument(this.state.id);
    });

  this.render();
}
