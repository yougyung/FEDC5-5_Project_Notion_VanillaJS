import Editor from '../components/editor/Editor.js';
import SubDocumetFooter from '../components/editor/SubDocumentEditor.js';
import { createDOM } from '../utils/dom.js';

export default function EditPage({
  $target,
  initialState,
  onEditDocument,
  onClickSubDocument,
}) {
  const $editPageContainer = createDOM({
    tagName: 'div',
    className: 'edit-page-container',
  });

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    editor.setState(this.state.selectedDocument);
    subDocumentFooter.setState(this.state.subDocuments);
  };

  const editor = new Editor({
    $target: $editPageContainer,
    initialState: this.state,
    onEditing: onEditDocument,
  });

  const subDocumentFooter = new SubDocumetFooter({
    $target: $editPageContainer,
    initialState: this.state,
    onClick: onClickSubDocument,
  });

  $target.appendChild($editPageContainer);

  this.render();
}
