import Sidebar from '../pages/Sidebar.js';
import { request } from '../util/api.js';
import { initRouter, push } from '../util/router.js';
import { setItem, getItem, removeItem } from '../util/storage.js';

import DocumentEditPage from '../pages/DocumentEditPage.js';
import IndexPage from '../pages/IndexPage.js';

export default function App({ $target, initialState }) {
  const $sidebarContainer = document.createElement('div');
  const $editorContainer = document.createElement('div');

  $target.appendChild($sidebarContainer);
  $target.appendChild($editorContainer);

  $sidebarContainer.className = 'sidebar-container';
  $editorContainer.className = 'editor-container';

  this.state = initialState;

  const sidebar = new Sidebar({
    $target: $sidebarContainer,
    onDocumentFoldToggle: (nextState) => {
      this.setState({ ...this.state, documents: nextState });
    },
    onDocumentAdded: async (documentId) => {
      const updateIsFolded = (documents, targetId) => {
        return documents.map((document) => {
          if (document.id === targetId) {
            return { ...document, isFolded: false };
          }

          if (document.documents && document.documents.length > 0) {
            return {
              ...document,
              documents: updateIsFolded(document.documents, targetId),
            };
          }

          return document;
        });
      };

      const updatedDocuments = updateIsFolded(this.state.documents, documentId);
      this.setState({ ...this.state, documents: updatedDocuments });

      const createdDocument = await request('/documents', {
        method: 'POST',
        body: JSON.stringify({ title: '새 문서', parent: documentId }),
      });
      push(`/documents/${createdDocument.id}`);

      if (documentId) {
        const selectedDocument = await fetchDocument(documentId, true);
        setItem(`temp-document-${documentId}`, selectedDocument);
      }

      await fetchDocumentList();
    },
    onDocumentClick: async (documentId) => {
      if (documentId) {
        const selectedDocument = await fetchDocument(documentId, true);
        setItem(`temp-document-${documentId}`, selectedDocument);
      }

      await fetchDocument(documentId);
    },
  });

  let documentEditTimer = null;
  const documentEditPage = new DocumentEditPage({
    $target: $editorContainer,
    onEditing: (editedDocument) => {
      console.log(editedDocument);
      if (documentEditTimer !== null) {
        clearTimeout(documentEditTimer);
      }

      documentEditTimer = setTimeout(async () => {
        const { id, title, content } = editedDocument;
        documentEditPage.setState({ ...editedDocument, isSaving: false });

        let documentLocalSaveKey = `temp-document-${id}`;
        setItem(documentLocalSaveKey, editedDocument);

        console.log('저장 중..');
        await request(`/documents/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ title, content }),
        });

        this.setState({ ...this.state, editingDocument: editedDocument });
        documentEditPage.setState({ ...editedDocument, isSaving: true });

        await fetchDocumentList();

        console.log('저장완료');
      }, 2000);
    },
    onRemoveDocument: async (documentId) => {
      await request(`/documents/${documentId}`, {
        method: 'DELETE',
      });

      await fetchDocumentList();
      push('/');
    },
    onDocumentClick: async (documentId) => {
      await fetchDocument(documentId);
    },
  });

  this.mergeDocuments = (oldDocuments, newDocuments) => {
    return newDocuments.map((newDocument) => {
      const oldDocument = oldDocuments.find((doc) => doc.id === newDocument.id);

      return {
        ...newDocument,
        isFolded: oldDocument
          ? oldDocument.isFolded
          : !newDocument.documents || newDocument.documents.length === 0,
        documents: this.mergeDocuments(
          oldDocument ? oldDocument.documents : [],
          newDocument.documents || [],
        ),
      };
    });
  };

  this.setState = (nextState) => {
    this.state = nextState;
    sidebar.setState(this.state.documents);
    documentEditPage.setState(this.state.editingDocument);
  };

  const fetchDocumentList = async () => {
    const newDocuments = await request('/documents', { method: 'GET' });

    const mergedDocuments = this.mergeDocuments(
      this.state.documents,
      newDocuments,
    );

    this.setState({ ...this.state, documents: mergedDocuments });
  };

  const fetchDocument = async (documentId, isParent = false) => {
    const selectedDocument = await request(`/documents/${documentId}`, {
      method: 'GET',
    });
    if (isParent) {
      return selectedDocument;
    }
    this.setState({ ...this.state, editingDocument: selectedDocument });
  };

  const indexPage = new IndexPage({ $target: $editorContainer });

  this.route = () => {
    $editorContainer.innerHTML = '';
    const { pathname } = window.location;

    if (pathname === '/') {
      this.setState({ ...this.state, editingDocument: null });
      indexPage.render();
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , documentId] = pathname.split('/');
      const savedDocumentData = getItem(`temp-document-${documentId}`);

      if (savedDocumentData) {
        this.setState({ ...this.state, editingDocument: savedDocumentData });
      } else {
        fetchDocument(documentId);
      }
    }
  };

  window.addEventListener('popstate', () => {
    this.route();
  });

  fetchDocumentList();
  this.route();

  initRouter(() => this.route());
}
