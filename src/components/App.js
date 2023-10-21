import Sidebar from '../pages/Sidebar.js';
import { request } from '../util/api.js';
import { initRouter } from '../util/router.js';

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
      fetchDocuments();
    },
    onDocumentDeleted: async () => {
      await this.setState();
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
    console.log(this.state);
  };

  const fetchDocuments = async () => {
    const documents = await request('/documents', { method: 'GET' });
    this.setState(this.addIsFolded(documents));
  };

  fetchDocuments();

  this.route = () => {
    $editorContainer.innerHTML = '';
    const { pathname } = window.location;

    if (pathname === '/') {
      // documentPage.setState();
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , postId] = pathname.split('/');
      console.log(postId);
      // documentEditPage.setState({ postId });
    }
  };

  this.route();

  initRouter(() => this.route());
}
