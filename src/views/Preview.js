import { useDocument } from "../utils/store.js";
import { parseContent } from "../utils/editorHelper.js";

const PreViewProps = {
  documentId: "number",
};

/**
 * @description 마크다운 미리보기 뷰
 */
export default function PreView({ $parent, initState }) {
  const $component = document.createElement("section");
  $component.setAttribute("id", "pre-view");
  $component.classList.add("view");

  this.state = initState;
  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };

    if (!this.state) {
      return;
    }

    this.render();
  };

  this.render = () => {
    // subscriber 최초 등록시 발생하는 랜더링 블로킹
    if (!this.state) return;

    $component.innerHTML =
      `<h1><h1>${useDocument.state.title}<br/>` +
      parseContent(useDocument.state.content ?? "");
    $parent.appendChild($component);
  };
}
