import DocumentDetail from '../components/template/DocumentDetail.js';
import NotionSideBar from '../components/template/NotionSideBar.js';
import { request } from '../services/api.js';
import { initRouter } from '../utils/router.js';

/*
 * HomePage
 * - NotionSideBar
 * - DocumentDetail
 * */

const DUMMY_DATA = [
  {
    id: 100997,
    title: 'A',
    documents: [
      {
        id: 101002,
        title: 'B',
        documents: [],
      },
    ],
  },
  {
    id: 100998,
    title: 'C',
    documents: [],
  },
];

export default function HomePage({ $target }) {
  const $homePage = document.createElement('div');
  $homePage.style.display = 'flex';
  $homePage.style.flexDirection = 'row';
  $target.appendChild($homePage);

  this.state = [];

  let initRender = false;
  this.setState = nextState => {
    this.state = nextState;
    this.route();
  };

  const notionSideBar = new NotionSideBar({ $target: $homePage, initialState: this.state });
  const documentDetail = new DocumentDetail({
    $target: $homePage,
    documentState: { id: null, title: '첫 화면', content: '내용을 채워주세요', documentPath: [] },
  });
  this.init = async () => {
    const resqonseData = await request('/documents');
    this.setState(resqonseData);
    this.route();
  };

  this.init();

  const findDocumentDataById = id => {
    const documentPath = [null];

    const findDocument = (documents, id) => {
      for (const document of documents) {
        if (document.id === id) {
          documentPath.push({ title: document.title, id: document.id });
          documentPath.push();
          return true;
        }
        if (document.documents.length > 0) {
          documentPath.push({ title: document.title, id: document.id });
          if (findDocument(document.documents, id)) return true;
          documentPath.pop();
        }
      }
    };
    findDocument(this.state, id);

    return documentPath;
  };

  this.route = async () => {
    // $homePage.innerHTML = '';

    const { pathname } = window.location;

    const newDocuments = await request(`/documents`);
    if (pathname === '/') {
      // home 보여주기
      notionSideBar.setState(newDocuments);
      documentDetail.setState(null);
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , postId] = pathname.split('/');
      const documentContent = request(`/documents/${postId}`);
      const documentPathData = findDocumentDataById(Number(postId));

      // sidebar 업데이트
      // notionSideBar.setState({ data: newDocuments, openDocuments: documentPathData });
      notionSideBar.setState(newDocuments);

      // document 보여주기

      const { content } = await documentContent;

      const nextState = {
        id: postId,
        title: documentPathData.at(-1)?.title || '첫 화면',
        content: content || '내용을 채워주세요',
        documentPath: documentPathData,
      };
      console.log('documentDetail nextState', nextState);
      documentDetail.setState(nextState);
    }
  };

  initRouter(this.route);

  window.addEventListener('popstate', e => {
    this.route();
  });
}
