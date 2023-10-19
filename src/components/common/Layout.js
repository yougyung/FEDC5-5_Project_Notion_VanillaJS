import EditorView from "../../views/EditorView.js";
import PreView from "../../views/PreView.js";
import Welcome from "./Welcome.js";

import { initRouter } from "../../router.js";
import { useDocument } from "../../utils/store.js";
import { parseQuery } from "../../utils/parseQuery.js";

/**
 * @description 레이아웃 컴포넌트 - view 렌더링 루트
 */
export default function Layout({ $app, initState }) {
  const $layout = document.createElement("div");
  $layout.setAttribute("id", "layout");
  $app.appendChild($layout);

  const welcome = new Welcome({ $parent: $layout });
  const editorView = new EditorView({
    $parent: $layout,
    initState: {
      documentId: "",
      documentData: { id: "", title: "", content: "" },
    },
  });
  const preView = new PreView({ $parent: $layout });

  this.route = () => {
    const { pathname, search } = window.location;
    $layout.innerHTML = "";

    if (pathname === "/") {
      welcome.render();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [_, __, documentId] = pathname.split("/");

      const docParentId =
        search.length > 0 ? parseQuery(search)["parent"] ?? null : null;

      editorView.setState({
        documentId,
        documentParentId: docParentId,
      });
      preView.setState({ documentId });
    }
  };
  this.route();

  initRouter(() => this.route());

  window.addEventListener("popstate", () => this.route());

  // subscribers //
  useDocument.setState({ subscribers: [preView] });
}
