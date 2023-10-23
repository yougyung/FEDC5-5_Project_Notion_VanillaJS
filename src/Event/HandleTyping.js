import CreateEditTextElement from "../Components/PageViewer/Editor/CreateEditTextElement.js";

export default function handleTyping({ event }) {
  if (event.key !== " ") {
    return;
  }
  const text = event.target.innerHTML;
  const target = event.target;

  /* 제목 관련 */

  if (text.indexOf("# ") === 0 || text.indexOf("#&nbsp;") === 0) {
    hasClass(target);
    target.classList.add("h1");

    const replaced = text.replace(/#./, "").replace(/nbsp;/, " ");
    target.innerText = replaced;
    changeFocus(target);
  }
  if (text.indexOf("## ") === 0 || text.indexOf("##&nbsp;") === 0) {
    hasClass(target);
    target.classList.add("h2");

    const replaced = text.replace(/##./, "").replace(/nbsp;/, " ");
    target.innerText = replaced;
    changeFocus(target);
  }
  if (text.indexOf("### ") === 0 || text.indexOf("###&nbsp;") === 0) {
    hasClass(target);
    target.classList.add("h3");

    const replaced = text.replace(/###./, "").replace(/nbsp;/, " ");
    target.innerText = replaced;

    changeFocus(target);
  }

  /* 구분선 */
  if (text.indexOf("- - -&nbsp;") === 0) {
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
}

/*  */
function hasClass(target) {
  if (target.hasAttribute("class")) {
    target.removeAttribute("class");
  }
}

function changeFocus(target) {
  setTimeout(() => {
    target.focus();
  }, 0);
}
