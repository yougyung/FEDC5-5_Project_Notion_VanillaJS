import CreateDOM from "../Components/PageViewer/Editor/CreateEditTextElement.js";
import { changeplaceFoucs } from "../Function/ChangeFocus.js";

export function controlKey({ event, target }) {
  /* Enter new create Element */
  const eTarget = event.target;
  const prevTarget = eTarget.previousSibling;
  const nextTarget = eTarget.nextSibling;
  const offSetFocus = document.getSelection().focusOffset;

  //  선택한 요소 바로 인접 형제요소로 들어가도록
  if (event.key === "Enter") {
    event.preventDefault();
    new CreateDOM({
      target,
      element: "div",
      focusTarget: eTarget,
    });
  }

  // 첫 줄 여러줄 존재할때 삭제
  if (
    event.key === "Backspace" &&
    eTarget.innerText.length === 0 &&
    prevTarget
  ) {
    event.preventDefault();
    prevTarget.focus();
    changeplaceFoucs(prevTarget, Infinity);
    eTarget.remove();
  }

  if (event.key === "ArrowUp" && prevTarget) {
    event.preventDefault();
    prevTarget.focus();
    changeplaceFoucs(prevTarget, offSetFocus);
  }

  if (event.key === "ArrowDown" && nextTarget) {
    event.preventDefault();
    nextTarget.focus();
    changeplaceFoucs(nextTarget, offSetFocus);
  }
}
