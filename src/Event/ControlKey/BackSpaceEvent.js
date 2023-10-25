import { changePlaceFoucs } from "../../Function/Focus.js";

export default function backspaceEvent({
  eventTarget,
  prevTarget,
  nextTarget,
  event,
  EditorElment,
}) {
  /* 콜 아웃 */
  if (eventTarget.className === "callBox_textBox") {
    event.preventDefault();
    const text = eventTarget.innerText;
    const parentElement = eventTarget.parentNode;
    parentElement.removeAttribute("class");
    parentElement.setAttribute("contenteditable", "true");
    parentElement.innerText = text;
    changePlaceFoucs({ target: parentElement });
    prevTarget.remove();
    eventTarget.remove();

    return;
  }

  /* 삭제후 이동 대상이 콜박스 일때 */
  if (prevTarget && prevTarget.className === "callBox") {
    event.preventDefault();
    const text = eventTarget.innerText;
    const focusTarget = prevTarget.lastChild;
    const pickOffset = focusTarget.innerText.length;
    focusTarget.innerText += text;
    changePlaceFoucs({ target: focusTarget, pickOffset });
    eventTarget.remove();
    return;
  }

  /* DivisionLine 삭제 관련 */
  if (
    prevTarget &&
    prevTarget.className === "divisionLine" &&
    confirm("구분선을 삭제하시겠나요? 💣")
  ) {
    event.preventDefault();
    prevTarget.remove();
    return;
  }

  /* 다음 값이 없으면 이전값으로 */
  if (!prevTarget) {
    changePlaceFoucs({ target: nextTarget, isEndPoint: true });
    eventTarget.remove();
    return;
  }

  if (EditorElment.childElementCount > 1) {
    event.preventDefault();
    const text = eventTarget.innerText;
    const pickOffset = prevTarget.innerText.length;
    prevTarget.innerText += text;

    changePlaceFoucs({ target: prevTarget, pickOffset });
    eventTarget.remove();
    return;
  }
}

/* 콜 아웃 삭제 관련 */
// if (eTarget.className === "callBox_textBox") {
//   const focusTarget = eTarget.parentNode.previousSibling;
//   changePlaceFoucs(focusTarget, true);

//   eTarget.parentNode.remove();
//   prevTarget.remove();
//   eTarget.remove();

//   return;
// }
