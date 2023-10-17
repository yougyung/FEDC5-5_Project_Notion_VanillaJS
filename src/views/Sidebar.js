import DocsIndexViewer from "../components/sidebar/DocsIndexViewer.js";
import { SIDEBAR_VIEW_MODE } from "../utils/constants.js";

/**
 * @description Sidbar root 컴포넌트
 */
export default function Sidebar({ $parent, initState }) {
  const $component = document.createElement("section");
  $component.setAttribute("id", "sidebar");
  $component.classList.add("view");

  $parent.appendChild($component);

  const sidebarViewRender = (sidebarViewMode) => {
    // init component render //
    $component.innerHTML = "";

    if (sidebarViewMode === SIDEBAR_VIEW_MODE.DOCS_INDEX_VIEWER) {
      new DocsIndexViewer({ $parent: $component });
    }
  };

  this.state = initState;
  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {
    sidebarViewRender("DOCS_INDEX_VIEWER");
  };
  this.render();
}
