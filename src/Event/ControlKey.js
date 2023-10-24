import CreateEditTextElement from "../Components/PageViewer/Editor/CreateEditTextElement.js";
import { changePlaceFoucs } from "../Function/ChangeFocus.js";

export function controlKey({ event, target }) {
  /* Enter new create Element */
  const eTarget = event.target;
  const prevTarget = eTarget.previousSibling;
  const nextTarget = eTarget.nextSibling;

  if (
    event.key === "Enter" &&
    nextTarget &&
    nextTarget.className === "divisionLine" &&
    confirm("구분선 아래에 생성하겠습니까? 📝")
  ) {
    event.preventDefault();
    new CreateEditTextElement({
      target,
      focusTarget: nextTarget,
    });
    return;
  }

  if (event.key === "Enter" && event.isComposing === false) {
    event.preventDefault();
    new CreateEditTextElement({
      target,
      focusTarget: eTarget,
    });
    return;
  }

  /* 삭제 관련 */
  /* 콜 아웃 삭제 관련  */
  if (
    event.key === "Backspace" &&
    prevTarget &&
    !prevTarget.parentNode.previousSibling &&
    eTarget.innerText.length === 0 &&
    eTarget.className === "callBox_textBox"
  ) {
    event.preventDefault();
    const parentElement = eTarget.parentNode;
    parentElement.removeAttribute("class");
    parentElement.setAttribute("contenteditable", "true");
    changePlaceFoucs(parentElement);
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
      changePlaceFoucs(focusTarget, true);

      eTarget.parentNode.remove();
      prevTarget.remove();
      eTarget.remove();

      return;
    }

    /* 삭제후 이동 대상이 콜박스 일때 */
    if (prevTarget && prevTarget.className === "callBox") {
      const focusTarget = prevTarget.lastChild;
      changePlaceFoucs(focusTarget, true);
    }

    /* 다음 값이 없으면 이전값으로 */
    if (!prevTarget) {
      changePlaceFoucs(nextTarget, true);
    }

    /* 기본 삭제 */
    changePlaceFoucs(prevTarget, true);
    eTarget.remove();
    return;
  }

  /* ArrowUp 화살표 이동 관련 */
  if (event.key === "ArrowUp") {
    event.preventDefault();

    /* 콜박스로 이동 */
    if (prevTarget && prevTarget.className === "callBox") {
      const focusTarget = prevTarget.lastChild;
      changePlaceFoucs(focusTarget);
      return;
    }

    /* 콜박스 에서 이전 줄로 이동 */
    if (
      eTarget.parentNode.previousSibling &&
      eTarget.className === "callBox_textBox"
    ) {
      const focusTarget = eTarget.parentNode.previousSibling;
      changePlaceFoucs(focusTarget);
      return;
    }

    /* 구분선 이동 */
    if (prevTarget && prevTarget.className === "divisionLine") {
      const disionPrevTarget = prevTarget.previousSibling;
      changePlaceFoucs(disionPrevTarget);
      return;
    }
    /* 기본 위로 이동 */
    changePlaceFoucs(prevTarget);
    return;
  }

  /* ArrowDown 화살표 관련 */
  if (event.key === "ArrowDown") {
    event.preventDefault();

    /* 콜박스로 이동 */
    if (nextTarget && nextTarget.className === "callBox") {
      const focusTarget = nextTarget.lastChild;
      changePlaceFoucs(focusTarget);
      return;
    }

    /* 콜박스에서 다음줄로 이동 */
    if (
      eTarget.className === "callBox_textBox" &&
      eTarget.parentNode.nextSibling
    ) {
      const focusTarget = eTarget.parentNode.nextSibling;
      changePlaceFoucs(focusTarget);
      return;
    }

    /* 구분선 이동 */
    if (nextTarget && nextTarget.className === "divisionLine") {
      const divisionNextTarget = nextTarget.nextSibling;
      changePlaceFoucs(divisionNextTarget);
      return;
    }

    /* 기본 이동 */
    changePlaceFoucs(nextTarget);
    return;
  }
}
