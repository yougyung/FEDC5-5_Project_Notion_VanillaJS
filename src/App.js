import DocumentList from './DocumentList.js';
import Editor from './Editor.js';
import { request } from './api.js';
import { initRouter, push } from './router.js';
import { removeItem, setItem } from './storage.js';

export default function App({ $target }) {
  const $documentListContainer = document.createElement('div');
  $documentListContainer.className = 'document-list-container';

  const $editorContainer = document.createElement('div');
  $editorContainer.className = 'editor-container';

  $target.appendChild($documentListContainer);
  $target.appendChild($editorContainer);

  let timer = null;

  this.state = {
    documentList: [],
    selectedDocument: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = async () => {
    await fetchRootDocuments();
    const { selectedDocument } = this.state;
    if (selectedDocument) {
      $editorContainer.style.display = 'block';
    } else {
      $editorContainer.style.display = 'none';
    }
  };

  const documentList = new DocumentList({
    $target: $documentListContainer,
    initialState: [],
    onClickDocument: async (id) => {
      await fetchSelectedDocument(id);
      push(`/${id}`);
    },
    onClickAddButton: async (id) => {
      const addedDocument = await fetchAddDocument(id, '제목 없음');

      this.setState({
        ...this.state,
        selectedDocument: addedDocument,
      });
      
      editor.setState(addedDocument);
    },
    onClickInitialAddButton: async () => {
      const addedDocument = await fetchAddDocument(null, '제목 없음');

      this.setState({
        ...this.state,
        selectedDocument: addedDocument,
      })

      editor.setState(addedDocument);
    }
  });

  const editor = new Editor({
    $target: $editorContainer,
    initialState: this.state.selectedDocument,
    onEditing: (document) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setItem('temp-post', {
          ...document,
          tempSavedAt: new Date(),
        });

        await request(`/${document.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            title: document.title,
            content: document.content,
          }),
        });
        
        removeItem('temp-post');
        this.render();
      }, 1000);
    },
  });

  const fetchRootDocuments = async () => {
    const rootDocuments = await request();
    documentList.setState(rootDocuments);
  };

  const fetchSelectedDocument = async (id) => {
    const selectedDocument = await request(`/${id}`);
    this.setState({
      ...this.state,
      selectedDocument,
    });
    editor.setState(selectedDocument);
  };

  const fetchAddDocument = async (parentId, title) => {
    const newDocument = await request('', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        parent: parentId,
      }),
    });
    return newDocument;
  };

  this.route = async () => {
    await fetchRootDocuments();
    const { pathname } = window.location;
    if (pathname === '/') {
      this.setState({
        ...this.state,
        selectedDocument: null,
      });
    } else {
      const id = pathname.slice(1);
      await fetchSelectedDocument(id);
    }
  };
  
  window.addEventListener('popstate', async () => {
    this.route();
  });

  this.route();
  initRouter(() => this.route());

}
