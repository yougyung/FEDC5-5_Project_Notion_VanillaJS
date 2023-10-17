import Editor from "../components/editor/Editor.js";
import EditorBottomUtil from "../components/editor/EditorBottomUtil.js";
import EditorHeader from "../components/editor/EditorHeader.js";

/**
 * @description 마크다운 편집기 뷰
 */
export default function EditorView({ $parent, initState }) {
  const $component = document.createElement("section");
  $component.setAttribute("id", "editor-view");
  $component.classList.add("view");

  $parent.appendChild($component);

  this.state = initState;
  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  const editorHeader = new EditorHeader({ $parent: $component });
  const editor = new Editor({ $parent: $component });
  const editorBottome = new EditorBottomUtil({ $parent: $component });

  this.render = () => {};
  this.render();
}
