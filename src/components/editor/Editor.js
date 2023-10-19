import calcHeight from "../../utils/calcTextareaHeight.js";

import { useDocument } from "../../utils/store.js";

const EditorPtops = {
  id: "number",
  title: "string",
  content: "string",
};

/**
 * @description 편집기 뷰의 편집 컴포넌트
 */
export default function Editor({
  $parent,
  initState = { id: "", title: "", content: "" },
  onEditing,
}) {
  const $component = document.createElement("div");
  $component.setAttribute("id", "editor");
  $component.classList.add("view-inner");

  $parent.appendChild($component);

  $component.innerHTML = `
  <input class="editor-title-input" type="text" name="title" style="width:100%;" placeholder="제목을 입력하세요" />
  <textarea class="editor-input" name="content" placeholder="내용을 입력하세요..."></textarea>
  `;

  this.state = initState;
  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {
    $component.querySelector("[name=title]").value = this.state.title;
    $component.querySelector("[name=content]").value = this.state.content;
  };
  this.render();

  const $textarea = $component.querySelector("[name=content]");
  $textarea?.addEventListener("keydown", () => {
    const height = calcHeight($textarea.value);
    $textarea.style.minHeight = height + "px";
  });
  $textarea?.addEventListener("keyup", () => {
    const nextState = {
      ...useDocument.state,
      content: $textarea.value,
    };
    useDocument.setState(nextState);
    onEditing(useDocument.state);
  });

  $component
    .querySelector("[name=title]")
    .addEventListener("keyup", (event) => {
      const nextState = {
        title: event.target.value,
      };
      useDocument.setState(nextState);
      // console.log(useDocument.state);
      onEditing(useDocument.state);
    });
}
