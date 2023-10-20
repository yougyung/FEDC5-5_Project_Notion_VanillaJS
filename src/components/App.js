import Sidebar from '../pages/Sidebar.js';
import { request } from '../util/api.js';
// import { initRouter } from '../util/router.js';

export default function App({ $target }) {
  const $sidebarContainer = document.createElement('div');
  const $editorContainer = document.createElement('div');
  $target.appendChild($sidebarContainer);
  $target.appendChild($editorContainer);

  const sidebar = new Sidebar({
    $target: $sidebarContainer,
    initialState: this.state,
    onDocumentClick: (nextState) => {
      this.setState(nextState);
    },
    onAddDocumen: async () => {
      await this.setState();
    },
    onDeleteDocument: async () => {
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

  this.init = async () => {
    // const documents = await request('/documents', { method: 'GET' });
    const documents = [
      {
        id: 1, // Document id
        title: '노션을 만들자', // Document title
        documents: [
          {
            id: 2,
            title: '블라블라',
            documents: [
              {
                id: 3,
                title: '함냐함냐',
                documents: [],
              },
            ],
          },
        ],
      },
      {
        id: 4,
        title: 'hello!',
        documents: [],
      },
    ];
    this.setState(this.addIsFolded(documents));
  };

  this.init();

  // this.route = () => {
  //   $target.innerHTML = '';
  //   const { pathname } = window.location;

  //   if (pathname === '/') {
  //     // documentPage.setState();
  //   } else if (pathname.indexOf('/documents/') === 0) {
  //     const [, , postId] = pathname.split('/');
  //     // documentEditPage.setState({ postId });
  //   }
  // };

  // this.route();

  // initRouter(() => this.route());
}
