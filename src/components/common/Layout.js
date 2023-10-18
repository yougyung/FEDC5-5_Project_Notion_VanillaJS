import EditorView from "../../views/EditorView.js";
import Sidebar from "../../views/Sidebar.js";
import PreView from "../../views/PreView.js";

import { useDocument } from "../../utils/store.js";
import { initRouter } from "../../router.js";
import {
  NEW_DOCUMENT_INIT_ID,
  SIDEBAR_VIEW_MODE,
} from "../../utils/constants.js";

/**
 * @description 레이아웃 컴포넌트 - view 렌더링 루트, UI 컨트롤 루트(모달, 팝업 등)
 */
export default function Layout({ $app, initState }) {
  const $layout = document.createElement("div");
  $layout.setAttribute("id", "layout");
  $app.appendChild($layout);

  const sidebar = new Sidebar({ $parent: $layout });
  const editorView = new EditorView({
    $parent: $layout,
    initState: { documentId: "", documentData: null },
  });
  const preView = new PreView({ $parent: $layout });

  this.route = () => {
    const { pathname } = window.location;
    $layout.innerHTML = "";

    sidebar.setState({
      sidebarViewMode:
        sidebar?.state?.sidebarViewMode ?? SIDEBAR_VIEW_MODE.DOCS_INDEX_VIEWER,
    });

    if (pathname === "/") {
      // postPage.setState();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [_, __, documentId] = pathname.split("/");
      editorView.setState({ documentId });
      preView.setState({ documentId });
    }
  };
  this.route();

  initRouter(() => this.route());

  window.addEventListener("popstate", () => this.route());

  // subscribers //
  useDocument.setState({ subscribers: [preView] });
}
