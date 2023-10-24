import CreateEditTextElement from "../Components/PageViewer/Editor/CreateEditTextElement.js";
import { changePlaceFoucs } from "../Function/ChangeFocus.js";

export default function handleTyping({ event }) {
  if (event.key !== " ") {
    return;
  }
  const text = changeWord(event.target.innerHTML);
  const target = event.target;

  /* 제목 관련 */

  if (text.indexOf("# ") === 0) {
    hasClass(target);
    target.classList.add("h1");

    const replaced = changeWord(text, /#./);
    target.innerText = replaced;
    changePlaceFoucs(target);
  }
  if (text.indexOf("## ") === 0) {
    hasClass(target);
    target.classList.add("h2");

    const replaced = changeWord(text, /##./);
    target.innerText = replaced;
    changePlaceFoucs(target);
  }
  if (text.indexOf("### ") === 0) {
    hasClass(target);
    target.classList.add("h3");

    const replaced = changeWord(text, /###./);
    target.innerText = replaced;

    changePlaceFoucs(target);
  }

  /* 구분선 */
  if (text.indexOf("- - - ") === 0) {
    hasClass(target);
    target.innerText = "";
    target.classList.add("divisionLine");
    target.removeAttribute("contenteditable");

    new CreateEditTextElement({
      target: target.closest(".pageViewer_editor_content"),
      focusTarget: target,
    });
  }

  /* 콜 아웃 */
  if (text.indexOf("/Call ") === 0 || text.indexOf("/call ") === 0) {
    hasClass(target);
    target.innerText = "";
    target.classList.add("callBox");
    target.removeAttribute("contenteditable");
    const replaced = changeWord(text, /\/call.|\/Call./);

    const emojiBox = new CreateEditTextElement({
      target,
      className: "callBox_emoji",
      text: "💡",
      noContentEdit: true,
      element: "span",
    });

    new CreateEditTextElement({
      target,
      text: replaced,
      className: "callBox_textBox",
      focusTarget: emojiBox.getElement(),
      element: "span",
    });
  }
}

/*  */
function hasClass(target) {
  if (target.hasAttribute("class")) {
    target.removeAttribute("class");
  }
}

function changeWord(text, reg = "") {
  return text
    .replace(reg, "")
    .replace(/&nbsp;/g, " ")
    .replace(/nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#035;/g, "#")
    .replace(/&#039;/g, "'");
}
