/*
 * EditDocument
 * - DocumentTitle
 * - DocumentContent
 * */

import DocumentTitle from '../molecules/editor/DocumentTitle.js';
import DocumentContent from '../molecules/editor/DocumentContent.js';
import { request } from '../../services/api.js';
import styleInJS from '../../style/tagStyles.js';
import { removeItem } from '../../utils/storage.js';

export default function EditDocument({ $target, initialState }) {
  const $editDocument = document.createElement('div');
  styleInJS({ $target: $editDocument, styleTagName: 'EditDocument' });
  $target.appendChild($editDocument);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    if (this.state.id === null) {
      documentTitle.setState({ ...this.state, title: this.state.title, isDisabled: true });
      documentContent.setState({ content: this.state.content, isDisabled: true });
      return;
    }
    documentTitle.setState({ ...this.state, title: this.state.title, isDisabled: false });
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
      removeItem(`SAVE_DOCUMENT_TITLE_KEY-${id}`);
    }, delayTime);
  };

  const documentTitle = new DocumentTitle({
    $target: $editDocument,
    initialState: { ...this.state, isDisabled: false },
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
