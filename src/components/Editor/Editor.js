import "./editor.css";
import { $ } from "../../utils/DOM/selector.js";
import { editDocumentTitle } from "../../utils/DOM/ListControl.js";
export default function Editor({ $target, initialState, onEditing }) {
  this.state = initialState;

  const $editor = document.createElement("div");
  $editor.className = "editor";

  $editor.innerHTML = `
     <input type="text" name="title" placeholder="제목 없음" />
      <div contentEditable="true"  class="content-area"  name="content" ></div>
      `;

  $target.appendChild($editor);

  $("div[contentEditable]", $editor).addEventListener("keydown", e => {
    if (e.keyCode === 13) {
      document.execCommand("defaultParagraphSeparator", false, "p");
      return false;
    }
  });

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { title, content } = this.state;

    $editor.querySelector("[name=title]").value = title;

    if (!content) {
      $editor.querySelector("[name=content]").innerHTML = "";
      return;
    }

    const richContent = content.split("\n").join("<br>");

    $editor.querySelector("[name=content]").innerHTML = richContent;
  };

  $editor.querySelector("[name=title]").addEventListener("keyup", e => {
    const newTitle = e.target.value;

    const nextState = {
      ...this.state,
      title: newTitle,
    };
    this.setState(nextState);

    // sidebar title 실시간 업데이트
    editDocumentTitle(this.state.id, newTitle);

    // 업데이트
    const { title, content } = this.state;
    const updateBody = { title, content };
    onEditing(updateBody);
  });

  $editor.querySelector("[name=content]").addEventListener("focusout", e => {
    const nextState = {
      ...this.state,
      content: e.target.innerHTML,
    };

    this.setState(nextState);
  });

  $editor.querySelector("[name=content]").addEventListener("input", e => {
    const nextState = {
      ...this.state,
      content: e.target.innerHTML,
    };

    // 업데이트
    const { title, content } = nextState;
    const updateBody = { title, content };
    onEditing(updateBody);
  });
}
