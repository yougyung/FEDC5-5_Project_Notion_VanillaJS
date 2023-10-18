import { useDocument } from "../utils/store.js";
import { parseContent } from "../utils/editorHelper.js";

/**
 * @description 마크다운 미리보기 뷰
 */
export default function PreView({ $parent, initState }) {
  const $component = document.createElement("section");
  $component.setAttribute("id", "pre-view");
  $component.classList.add("view");

  $parent.appendChild($component);

  const $editorInput = document.querySelector(".editor-input");

  this.state = initState;
  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {
    $component.innerHTML = parseContent(useDocument.state.content);
  };
  this.render();
}
