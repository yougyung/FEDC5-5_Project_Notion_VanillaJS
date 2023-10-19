import EditHeader from './EditHeader.js';
import Editor from './Editor.js';

export default function EditPage({ $target, initialState }) {
  const $editPage = document.createElement('div');
  $editPage.className = 'edit-main';

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    editHeader.setState(nextState);
    editor.setState(nextState);

    this.render();
  };

  this.render = () => {};

  $target.appendChild($editPage);

  const { selectedDoc } = this.state;
  //  edit header
  const editHeader = new EditHeader({
    $target: $editPage,
    initialState: selectedDoc.title,
  });
  // editor
  const editor = new Editor({
    $target: $editPage,
    initialState: selectedDoc.content,
  });
}
