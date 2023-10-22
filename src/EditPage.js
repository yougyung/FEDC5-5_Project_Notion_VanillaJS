import EditHeader from './EditHeader.js';
import Editor from './Editor.js';
import { request } from './api.js';
import { makeDocTree } from './makeDocTree.js';
import { addStorage } from './storage.js';

export default function EditPage({ $target, initialState, onEditDoc }) {
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

  //  edit header
  const editHeader = new EditHeader({
    $target: $editPage,
    initialState: this.state,
    onEditing: async (newDoc) => {
      const editDoc = await request(`/documents/${newDoc.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: newDoc.title,
          content: newDoc.content,
        }),
      });

      const docs = await request('/documents', {
        method: 'GET',
      });

      const nextState = {
        ...this.state,
        docsTree: docs,
        selectedDoc: editDoc,
        currentFocus: {
          id: newDoc.id,
          element: 'title',
        },
      };

      onEditDoc(nextState);
    },
  });
  // editor
  const editor = new Editor({
    $target: $editPage,
    initialState: this.state,
    onEditing: async (newDoc) => {
      const editDoc = await request(`/documents/${newDoc.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: newDoc.title,
          content: newDoc.content,
        }),
      });

      const docs = await request('/documents', {
        method: 'GET',
      });

      const nextState = {
        ...this.state,
        docsTree: docs,
        selectedDoc: editDoc,
        currentFocus: {
          id: newDoc.id,
          element: 'content',
        },
      };

      onEditDoc(nextState);
    },
  });
}
