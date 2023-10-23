/*
 * EditDocument
 * - DocumentTitle
 * - DocumentContent
 * */

import DocumentTitle from '../molecules/editor/DocumentTitle.js';
import DocumentContent from '../molecules/editor/DocumentContent.js';
import { request } from '../../services/api.js';

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
