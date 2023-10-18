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
    initialState: { documentId: "new" },
  });

  sidebar.setState();

  /** SPA 라우팅 */
  // 위치를 editorPage로 내려야하나?
  // 아님 그대로 여기에 두되,
  this.route = () => {
    console.log("화면 이동 감지");

    //$target.innerHTML = ""; // 화면 비우기
    const { pathname } = window.location;

    // root 접속 시 - 선택 안된 상황
    if (pathname === "/") {
      //sidebar.setState();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , documentId] = pathname.split("/");
      editorPage.setState(documentId);
    }
  };

  this.route();
  initRouter(() => this.route());
}
