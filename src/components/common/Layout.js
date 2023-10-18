import EditorView from "../../views/EditorView.js";
import Sidebar from "../../views/Sidebar.js";
import PreView from "../../views/Preview.js";

import { useDocument } from "../../utils/store.js";

/**
 * @description 레이아웃 컴포넌트 - view 렌더링 루트, UI 컨트롤 루트(모달, 팝업 등)
 */
export default function Layout({ $app, initState }) {
  const $layout = document.createElement("div");
  $layout.setAttribute("id", "layout");
  $app.appendChild($layout);

  const sidebar = new Sidebar({ $parent: $layout });
  const editorView = new EditorView({ $parent: $layout });
  const preView = new PreView({ $parent: $layout });

  // subscribers //
  useDocument.setState({ subscribers: [preView] });
}
