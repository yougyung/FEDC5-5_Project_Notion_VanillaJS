import Sidebar from '../pages/Sidebar.js';
import { request } from '../util/api.js';
import { initRouter } from '../util/router.js';
import { setItem, getItem } from '../util/storage.js';

import DocumentEditPage from '../pages/DocumentEditPage.js';
import IndexPage from '../pages/IndexPage.js';

export default function App({ $target }) {
  const $sidebarContainer = document.createElement('div');
  const $editorContainer = document.createElement('div');
  $target.appendChild($sidebarContainer);
  $target.appendChild($editorContainer);

  const sidebar = new Sidebar({
    $target: $sidebarContainer,
    initialState: this.state,
    onDocumentFoldToggle: (nextState) => {
      this.setState(nextState);
    },
    onDocumentAdded: async (documentId) => {
      await request('/documents', {
        method: 'POST',
        body: JSON.stringify({ title: '새 문서', parent: documentId }),
      });

      // 추후 낙관적 업데이트를 적용해봐도 좋을 듯 함
      fetchDocumentList();
    },
    onDocumentClick: async (documentId) => fetchDocument(documentId),
    onDocumentDeleted: async () => {
      await this.setState();
    },
  });

  const indexPage = new IndexPage({ $target: $editorContainer });

  let documentEditTimer = null;

  const documentEditPage = new DocumentEditPage({
    $target: $editorContainer,
    onEditing: (editedDocument) => {
      if (documentEditTimer !== null) {
        clearTimeout(documentEditTimer);
      }

      documentEditTimer = setTimeout(async () => {
        const { id, title, content } = editedDocument;
        let documentLocalSaveKey = `temp-document-${id}`;
        setItem(documentLocalSaveKey, editedDocument);

        console.log('저장 중..');
        await request(`/documents/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ title, content }),
        });

        documentEditPage.setState(editedDocument);
        fetchDocumentList();
        console.log('저장완료');
      }, 2000);
    },
  });

  // 초기 통신을 통해 받아온 Documents 객체에 추가 프로퍼티를 부여
  this.addIsFolded = (documents) => {
    return documents.map((document) => ({
      ...document,
      isFolded: false,
      documents: this.addIsFolded(document.documents || []),
    }));
  };

  this.setState = (nextState) => {
    this.state = nextState;
    sidebar.setState(this.state);
  };

  const fetchDocumentList = async () => {
    const documents = await request('/documents', { method: 'GET' });
    this.setState(this.addIsFolded(documents));
  };

  const fetchDocument = async (documentId) => {
    const selectedDocument = await request(`/documents/${documentId}`, {
      method: 'GET',
    });
    documentEditPage.setState(selectedDocument);
  };

  this.route = () => {
    $editorContainer.innerHTML = '';
    const { pathname } = window.location;

    if (pathname === '/') {
      indexPage.render();
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , documentId] = pathname.split('/');
      const savedDocumentData = getItem(`temp-document-${documentId}`);

      if (savedDocumentData) {
        console.log(savedDocumentData);
        documentEditPage.setState(savedDocumentData);
      } else {
        fetchDocument(documentId);
      }
    }
  };

  fetchDocumentList();
  this.route();

  initRouter(() => this.route());
}
