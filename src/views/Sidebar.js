import DocsIndexViewer from "../components/DocsViewer/DocsIndexViewer.js";
import { SIDEBAR_VIEW_MODE } from "../utils/constants.js";

const SidebarProps = {
  sidebarViewMode: "string",
};

/**
 * @description Sidbar root 컴포넌트
 */
export default function Sidebar({ $parent, initState }) {
  const $component = document.createElement("section");
  $component.setAttribute("id", "sidebar");
  $component.classList.add("view");

  const sidebarViewRender = (sidebarViewMode) => {
    // init component render //
    $component.innerHTML = "";

    if (sidebarViewMode === SIDEBAR_VIEW_MODE.DOCS_INDEX_VIEWER) {
      const docsIndexViewer = new DocsIndexViewer({
        $parent: $component,
        initState: { data: [] },
      });
      docsIndexViewer.setState();
    }
  };

  this.state = initState;
  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {
    sidebarViewRender(this.state.sidebarViewMode);
    $parent.appendChild($component);
  };
}
