/*
 * EditDocument
 * - DocumentTitle
 * - DocumentContent
 * */

import DocumentTitle from '../molecules/editor/DocumentTitle.js';
import DocumentContent from '../molecules/editor/DocumentContent.js';

export default function EditDocument({ $target, initialState }) {
  const $editDocument = document.createElement('div');
  $editDocument.style.display = 'flex';
  $editDocument.style.flexDirection = 'column';

  $editDocument.style.alignItems = 'center';
  $target.appendChild($editDocument);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    documentTitle.setState(this.state.title);
    documentContent.setState(this.state.content);
  };

  const onEditing = state => {
    console.log(state);
  };

  const documentTitle = new DocumentTitle({
    $target: $editDocument,
    title: this.state.title,
    onEditing,
  });

  const documentContent = new DocumentContent({
    $target: $editDocument,
    content: this.state.content,
    onEditing,
  });
}
