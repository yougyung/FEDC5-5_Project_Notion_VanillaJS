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
  $editorHeader.appendChild($statusContainer);
  $editorHeader.appendChild($removeContainer);

  $titleContainer.innerHTML = `
  <input type="text" name="title" style="width:500px" value="">`;

  $removeContainer.innerHTML = `<i class="fa fa-trash remove-button"></i>`;

  this.state = { initialState, isSaving: null };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state) {
      const { title, isSaving } = this.state;
      $titleContainer.querySelector('[name=title]').value = title;

      if (isSaving === false) {
        $statusContainer.innerHTML = '<i class="fa fa-spinner"></i>';
      } else if (isSaving) {
        $statusContainer.innerHTML = '<i class="fa fa-check"></i>';

        setTimeout(() => {
          $statusContainer.innerHTML = '';
        }, 2000);
      }
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
