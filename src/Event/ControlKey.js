import CreateEditTextElement from "../Components/PageViewer/Editor/CreateEditTextElement.js";
import { changeplaceFoucs } from "../Function/ChangeFocus.js";

export function controlKey({ event, target }) {
  /* Enter new create Element */
  const eTarget = event.target;
  const prevTarget = eTarget.previousSibling;
  const nextTarget = eTarget.nextSibling;
  const offSetFocus = document.getSelection().focusOffset;

  //  Evnet type이 keypress가 아니면 고장 발생
  // event.type === "keypress"
  if (event.key === "Enter") {
    event.preventDefault();
    target.blur();
    new CreateEditTextElement({
      target,
      focusTarget: eTarget,
    });
    return;
  }

  /* 삭제 관련  */
  if (
    event.key === "Backspace" &&
    eTarget.innerText.length === 0 &&
    target.childElementCount > 1
  ) {
    event.preventDefault();
    /* DivisionLine 삭제 관련 */
    if (
      prevTarget.className === "divisionLine" &&
      confirm("구분선을 삭제하시겠나요? 💣")
    ) {
      prevTarget.remove();
      return;
    }

    if (prevTarget) {
      setTimeout(() => {
        prevTarget.focus();
        changeplaceFoucs(prevTarget, Infinity);
      }, 0);
    }
    if (!prevTarget) {
      setTimeout(() => {
        nextTarget.focus();
        changeplaceFoucs(nextTarget, Infinity);
      }, 0);
    }
    eTarget.remove();
    return;
  }

  if (event.key === "ArrowUp" && prevTarget) {
    event.preventDefault();
    setTimeout(() => {
      prevTarget.focus();
      changeplaceFoucs(prevTarget, offSetFocus);
    }, 0);
    return;
  }

  if (event.key === "ArrowDown" && nextTarget) {
    event.preventDefault();
    setTimeout(() => {
      nextTarget.focus();
      changeplaceFoucs(nextTarget, offSetFocus);
    }, 0);
    return;
  }
}
