import { changePlaceFoucs } from "../../Function/Focus.js";

export default function arrowUpEvent({ eventTarget, prevTarget }) {
  /* 체크박스에서 체크박스 체크박스에서 콜박스 콜박스에서 콜박스 콜박스에서 체크박스 */
  if (
    eventTarget.parentNode.previousSibling &&
    (eventTarget.parentNode.previousSibling.className === "checkbox" ||
      eventTarget.parentNode.previousSibling.className === "callBox") &&
    (eventTarget.className === "checkbox_text" ||
      eventTarget.className === "callBox_textBox")
  ) {
    const focusTarget = eventTarget.parentNode.previousSibling.lastChild;
    changePlaceFoucs({ target: focusTarget });
    return;
  }

  /* 콜박스로 이동 */
  if (prevTarget && prevTarget.className === "callBox") {
    const focusTarget = prevTarget.lastChild;
    changePlaceFoucs({ target: focusTarget });
    return;
  }

  /* 콜박스 에서 이전 줄로 이동 */
  if (
    eventTarget.parentNode.previousSibling &&
    eventTarget.className === "callBox_textBox"
  ) {
    const focusTarget = eventTarget.parentNode.previousSibling;
    changePlaceFoucs({ target: focusTarget });
    return;
  }

  /* 체크 박스로 이동 */
  if (prevTarget && prevTarget.className === "checkbox") {
    const focusTarget = prevTarget.lastChild;
    changePlaceFoucs({ target: focusTarget });
    return;
  }

  /* 체크 박스에서 이동 시작 */
  if (
    eventTarget.parentNode.previousSibling &&
    eventTarget.className === "checkbox_text"
  ) {
    const focusTarget = eventTarget.parentNode.previousSibling;
    changePlaceFoucs({ target: focusTarget });
    return;
  }

  /* 체크박스에서 체크박스 또는 콜아웃으로 */

  if (prevTarget && prevTarget.className === "divisionLine") {
    /* 구분선 이동 */
    const disionPrevTarget = prevTarget.previousSibling;
    changePlaceFoucs({ target: disionPrevTarget });
    return;
  }
  /* 기본 위로 이동 */
  changePlaceFoucs({ target: prevTarget });
  return;
}
