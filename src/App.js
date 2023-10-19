import { initRouter } from "./utils/router.js";
import {
  DUMMY_DATA,
  DUMMY_HEADER_TABS,
  DUMMY_SINGLE_POST_DATA,
} from "./mock.js";

import Sidebar from "./components/Sidebar/Sidebar.js";
import EditorPage from "./components/EditorPage/EditorPage.js";
import Header from "./components/Header/Header.js";
import Modal from "./components/CreateModal/Modal.js";
import { getPost, getPostList } from "./utils/api.js";

export default function App({ $target }) {
  /**
   * App에서 모든 State 관리
   */

  this.state = {
    documents: [],
    selectedDocument: DUMMY_SINGLE_POST_DATA,
  };

  this.setState = nextState => {
    this.state = nextState;
  };

  // Sidebar
  const sidebar = new Sidebar({ $target, initialState: DUMMY_DATA });
  sidebar.setState();

  // Editor
  const editorPage = new EditorPage({
    $target,
    initialState: DUMMY_SINGLE_POST_DATA,
  });

  // Header
  const header = new Header({ $target, initialState: [] });

  // New Modal
  const modal = new Modal({ $target, initialState: {} });

  /** 문서 목록 가져오기 + state 변경 + 사이드바 리렌더링 */
  const fetchDocuments = async () => {
    const documents = await getPostList();
    this.setState({
      ...this.state,
      documents,
    });
    sidebar.setState(this.state.documents);
  };

  /** 선택된 문서 가져오기 */
  const fetchDocument = async documentId => {
    const selectedDocument = await getPost(documentId);
    this.setState({
      ...this.state,
      selectedDocument,
    });

    editorPage.setState(this.state.selectedDocument);
  };

  this.route = () => {
    //$target.innerHTML = ""; // 화면 비우기
    const { pathname } = window.location;

    // root 접속 시 - 선택 안된 상황
    if (pathname === "/") {
      // 루트 ui 추가 필요
      // editor가 있다면 지우기
    } else if (pathname.indexOf("/documents/") === 0) {
      // 루트 ui 삭제 필요
      const [, , documentId] = pathname.split("/");
      fetchDocument(documentId);
    } else if (pathname === "/new") {
      editorPage.setState("new");
    }
  };

  const init = async () => {
    await fetchDocuments();
    this.route();
    initRouter(() => this.route());
  };

  init();
}
