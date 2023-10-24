import calcHeight from "../../utils/calcTextareaHeight.js";

import {
  EDITOR_VALUE_CHANGE_EVENT_NAME,
  NEW_DOCUMENT_INIT_ID,
} from "../../utils/constants.js";
import { useDocument } from "../../utils/store.js";

/**
 * @description 편집기 뷰의 편집 컴포넌트
 */
export default function Editor({ $parent, onEditing }) {
  const $component = document.createElement("div");
  $component.setAttribute("id", "editor");
  $component.classList.add("view-inner");

  $component.innerHTML = `
  <input class="editor-title-input" type="text" name="title" style="width:100%;" placeholder="제목을 입력하세요" />
  <textarea class="editor-input" name="content" placeholder="내용을 입력하세요..."></textarea>
  `;

  $parent.appendChild($component);

  this.render = () => {
    const { id, title, content } = useDocument.state;
    const $textarea = $component.querySelector("[name=content]");

    $component.querySelector("[name=title]").value = title;
    $textarea.value = content;

    if (id !== NEW_DOCUMENT_INIT_ID) {
      $textarea.focus();
    }
  };
  this.render();

  $component
    .querySelector("[name=title]")
    .addEventListener("keyup", (event) => {
      const nextState = {
        title: event.target.value,
      };
      useDocument.setState(nextState);
      onEditing(useDocument.state);
    });

  const $textarea = $component.querySelector("[name=content]");
  $textarea?.addEventListener("keydown", () => {
    const height = calcHeight($textarea.value);
    $textarea.style.minHeight = height + "px";
  });
  $textarea?.addEventListener("input", () => {
    const nextState = {
      ...useDocument.state,
      content: $textarea.value,
    };
    useDocument.setState(nextState);
    onEditing(useDocument.state);
  });
  $textarea?.addEventListener(EDITOR_VALUE_CHANGE_EVENT_NAME, () => {
    onEditing(useDocument.state);
  });
}
