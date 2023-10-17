import { initRouter } from "./utils/router.js";
import {
  DUMMY_DATA,
  DUMMY_HEADER_TABS,
  DUMMY_SINGLE_POST_DATA,
} from "./mock.js";

import Sidebar from "./components/Sidebar/Sidebar.js";
import EditorPage from "./components/EditorPage/EditorPage.js";

export default function App({ $target }) {
  const sidebar = new Sidebar({ $target, initialState: DUMMY_DATA });
  const editorPage = new EditorPage({
    $target,
    initialState: DUMMY_SINGLE_POST_DATA,
  });

  /** SPA 라우팅 */
  this.route = () => {
    console.log("화면 이동 감지");

    //$target.innerHTML = ""; // 화면 비우기
    const { pathname } = window.location;

    // root 접속 시 - 선택 안된 상황
    if (pathname === "/") {
      sidebar.setState();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , documentId] = pathname.split("/");
      console.log(documentId);
      editorPage.setState(documentId);
    }
  };

  this.route();
  initRouter(() => this.route());
}
