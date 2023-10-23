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
  if (
    event.key === "Enter" &&
    nextTarget &&
    nextTarget.className === "divisionLine" &&
    confirm("구분선 아래에 생성하겠습니까? 📝")
  ) {
    event.preventDefault();
    target.blur();
    new CreateEditTextElement({
      target,
      focusTarget: nextTarget,
    });
    return;
  }

  if (event.key === "Enter" && event.isComposing === false) {
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
    prevTarget &&
    !prevTarget.parentNode.previousSibling &&
    eTarget.innerText.length === 0 &&
    eTarget.className === "callBox_textBox"
  ) {
    const parentElement = eTarget.parentNode;
    console.log(parentElement);
    parentElement.removeAttribute("class");
    parentElement.setAttribute("contenteditable", "true");
    setTimeout(() => {
      parentElement.focus();
    }, 0);
    prevTarget.remove();
    eTarget.remove();
    return;
  }

  if (
    event.key === "Backspace" &&
    eTarget.innerText.length === 0 &&
    target.childElementCount > 1
  ) {
    event.preventDefault();
    /* DivisionLine 삭제 관련 */

    if (
      prevTarget &&
      prevTarget.className === "divisionLine" &&
      confirm("구분선을 삭제하시겠나요? 💣")
    ) {
      prevTarget.remove();
      return;
    }

    /* 콜 아웃 삭제 관련 */

    if (eTarget.className === "callBox_textBox") {
      const focusTarget = eTarget.parentNode.previousSibling;
      setTimeout(() => {
        focusTarget.focus();
        changeplaceFoucs(focusTarget, Infinity);
      }, 0);
      eTarget.parentNode.remove();
      prevTarget.remove();
      eTarget.remove();

      return;
    }

    if (prevTarget.className === "callBox") {
      const focusTarget = prevTarget.lastChild;
      focusTarget.focus();
      changeplaceFoucs(focusTarget, Infinity);
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

  /* ArrowUp 화살표 이동 관련 */
  if (
    event.key === "ArrowUp" &&
    prevTarget &&
    prevTarget.className === "callBox"
  ) {
    event.preventDefault();
    setTimeout(() => {
      const focusTarget = prevTarget.lastChild;
      focusTarget.focus();
      changeplaceFoucs(focusTarget, offSetFocus);
    }, 0);
    return;
  }

  if (
    eTarget.parentNode.previousSibling &&
    event.key === "ArrowUp" &&
    eTarget.className === "callBox_textBox"
  ) {
    event.preventDefault();
    setTimeout(() => {
      const focusTarget = eTarget.parentNode.previousSibling;
      focusTarget.focus();
      changeplaceFoucs(focusTarget, offSetFocus);
    }, 0);
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

  /* ArrowDown 화살표 관련 */

  if (
    event.key === "ArrowDown" &&
    nextTarget &&
    nextTarget.className === "callBox"
  ) {
    event.preventDefault();
    setTimeout(() => {
      const focusTarget = nextTarget.lastChild;
      focusTarget.focus();
      changeplaceFoucs(focusTarget, offSetFocus);
    }, 0);

    return;
  }

  if (
    event.key === "ArrowDown" &&
    eTarget.className === "callBox_textBox" &&
    eTarget.parentNode.nextSibling
  ) {
    event.preventDefault();
    setTimeout(() => {
      const focusTarget = eTarget.parentNode.nextSibling;
      focusTarget.focus();
      changeplaceFoucs(focusTarget, offSetFocus);
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
