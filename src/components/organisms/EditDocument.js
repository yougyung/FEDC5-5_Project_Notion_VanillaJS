/*
 * EditDocument
 * - DocumentTitle
 * - DocumentContent
 * */

import DocumentTitle from '../molecules/editor/DocumentTitle.js';
import DocumentContent from '../molecules/editor/DocumentContent.js';
import { request } from '../../services/api.js';
import styleInJS from '../../style/tagStyles.js';

export default function EditDocument({ $target, initialState }) {
  const $editDocument = document.createElement('div');
  styleInJS({ $target: $editDocument, styleTagName: 'EditDocument' });
  $target.appendChild($editDocument);

  this.state = initialState;

  this.setState = nextState => {
    console.log('EditDocument setState', nextState);
    this.state = nextState;
    if (this.state.id === null) {
      documentTitle.setState({ title: this.state.title, isDisabled: true });
      documentContent.setState({ content: this.state.content, isDisabled: true });
      return;
    }
    documentTitle.setState({ title: this.state.title, isDisabled: false });
    documentContent.setState({ content: this.state.content, isDisabled: false });
    debouncePostDocument(this.state, 1000);
  };

  let timer = null;
  const debouncePostDocument = (state, delayTime) => {
    const { id, title, content } = state;
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(async () => {
      await request(`/documents/${id}`, {
        method: 'PUT',
        body: {
          title,
          content,
        },
      });
    }, delayTime);
  };

  const documentTitle = new DocumentTitle({
    $target: $editDocument,
    title: this.state.title,
    onEditTitle: title => {
      const nextState = { ...this.state, title };
      this.setState(nextState);
    },
  });

  const documentContent = new DocumentContent({
    $target: $editDocument,
    content: this.state.content,
    onEditContent: content => {
      const nextState = { ...this.state, content };
      this.setState(nextState);
    },
  });
}
