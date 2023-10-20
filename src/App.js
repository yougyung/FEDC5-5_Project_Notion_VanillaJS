import { $ } from "./utils/DOM.js";
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
import OnBoarding from "./components/onBoarding/OnBoarding.js";
import Footer from "./components/Footer/Footer.js";

import { createPost, getPost, getPostList } from "./utils/api.js";

export default function App({ $target }) {
  const $leftContainer = $("#left-container");
  const $rightContainer = $("#right-container");

  /**
   * App에서 모든 State 관리
   */

  this.state = {
    documents: [],
    selectedDocument: DUMMY_SINGLE_POST_DATA,
  };

  this.setState = nextState => {
    this.state = nextState;
    reRender();
  };

  // 모달 열기
  const displayModal = async parentId => {
    if (parentId === null || parentId !== "close") {
      const newDocument = await createPost({
        title: "제목 없음",
        parent: parentId,
      });
      const newDocumentBody = await getPost(newDocument.id);
      this.setState({ ...this.state, selectedDocument: newDocument });
    }

    $(".modal").classList.toggle("hidden");
  };

  const onAddSubDocument = async parentId => {
    await displayModal(parentId);
  };

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

  // Sidebar
  const sidebar = new Sidebar({
    $target: $leftContainer,
    displayModal,
    onAddSubDocument,
  });
  sidebar.setState();

  const onboarding = new OnBoarding({ $target: $rightContainer });

  // Header
  const header = new Header({ $target: $rightContainer, initialState: [] });

  // Editor
  const editorPage = new EditorPage({
    $target: $rightContainer,
    initialState: DUMMY_SINGLE_POST_DATA,
  });

  // Footer
  const footer = new Footer({
    $target: $rightContainer,
    initialState: this.state.selectedDocument.documents,
  });

  // New Modal
  const modal = new Modal({
    $target,
    initialState: this.state.selectedDocument,
    displayModal,
  });

  const reRender = () => {
    modal.setState(this.state.selectedDocument);
  };

  this.route = async () => {
    //$target.innerHTML = ""; // 화면 비우기
    const { pathname } = window.location;

    onboarding.render();

    // root 접속 시 - 선택 안된 상황
    if (pathname === "/") {
    } else if (pathname.indexOf("/documents/") === 0) {
      // 루트 ui 삭제 필요
      const [, , documentId] = pathname.split("/");

      header.setState(documentId);
      await fetchDocument(documentId);
      footer.setState(this.state.selectedDocument.documents);
    }
  };

  const init = async () => {
    await fetchDocuments();
    this.route();
    initRouter(() => this.route());
  };

  init();
}
