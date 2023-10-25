import { changePlaceFoucs } from "../../Function/Focus.js";

export default function arrowUpEvent({ eventTarget, prevTarget }) {
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

  /* 구분선 이동 */
  if (prevTarget && prevTarget.className === "divisionLine") {
    const disionPrevTarget = prevTarget.previousSibling;
    changePlaceFoucs({ target: disionPrevTarget });
    return;
  }
  /* 기본 위로 이동 */
  changePlaceFoucs({ target: prevTarget });
  return;
}
