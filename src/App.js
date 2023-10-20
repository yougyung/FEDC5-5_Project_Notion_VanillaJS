import EditPage from './EditPage.js';
import SideNav from './SideNav.js';
import { request } from './api.js';
import { initRouter, push } from './router.js';
import { addStorage, getStorage, removeStorage } from './storage.js';

export default function App({ $target }) {
  // 상태 관리
  this.state = {
    docsTree: [],
    selectedDoc: {
      ...getStorage('selectedDoc', null),
    },
  };

  this.setState = (nextState) => {
    this.state = nextState;

    sideNav.setState(nextState);
    editPage.setState(nextState);

    this.render();
  };

  this.render = () => {};

  // 사이드 네비바
  const sideNav = new SideNav({
    $target,
    initialState: this.state,
    // 추가 버튼
    onClickPlusBtn: async (id) => {
      const newDoc = await request(`/documents`, {
        method: 'POST',
        body: JSON.stringify({
          title: ``,
          // parent가 null이면 루트 Document가 됩니다.
          // 특정 Document에 속하게 하려면 parent에
          // 해당 Document id를 넣으세요.
          parent: id === 'root' ? null : Number(id),
        }),
      });

      await request(`/documents/${newDoc.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: `${newDoc.id}의 title`,
          content: `${newDoc.id}의 content`,
        }),
      });

      fetchDocTree();
    },

    // 삭제 버튼
    onClickDeleteBtn: async (id) => {
      await request(`/documents/${id}`, {
        method: 'DELETE',
      });

      fetchDocTree();
    },

    // 문서 클릭
    onClickDoc: async (id) => {
      const doc = await request(`/documents/${id}`, {
        method: 'GET',
      });

      addStorage('selectedDoc', doc);
      push(`/documents/${id}`);
      this.setState({
        ...this.state,
        selectedDoc: doc,
      });
    },

    // 메인 클릭
    onClickMain: () => {
      removeStorage('selectedDoc');
      push('/');
      this.setState({
        ...this.state,
        selectedDoc: {},
      });
    },
  });

  // edit Page
  const editPage = new EditPage({ $target, initialState: this.state });

  // 전체 DocTree 가져오기
  const fetchDocTree = async () => {
    const docs = await request('/documents', {
      method: 'GET',
    });

    this.setState({
      ...this.state,
      docsTree: docs,
    });
  };

  fetchDocTree();

  // 라우팅
  this.route = async () => {
    const { pathname } = window.location;
    // 메인화면
    if (pathname === '/') {
      removeStorage('selectedDoc');
      this.setState({
        ...this.state,
        selectedDoc: {},
      });
    } // 문서 id 접속
    else if (pathname.indexOf('/documents/') === 0) {
      const [, , documentId] = pathname.split('/');

      const doc = await request(`/documents/${documentId}`, {
        method: 'GET',
      });

      addStorage('selectedDoc', doc);
      this.setState({
        ...this.state,
        selectedDoc: doc,
      });
    }
  };

  this.route();
  // 라우팅 url 변경
  initRouter(() => this.route());
}
