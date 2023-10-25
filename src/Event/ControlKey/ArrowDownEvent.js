import { changePlaceFoucs } from "../../Function/Focus.js";

export default function arrowDownEvent({ eventTarget, nextTarget }) {
  /* 콜박스 이동 */
  if (nextTarget && nextTarget.className === "callBox") {
    const focusTarget = nextTarget.lastChild;
    changePlaceFoucs({ target: focusTarget });
    return;
  }

  /* 콜박스에서 다음줄로 이동 */
  if (
    eventTarget.className === "callBox_textBox" &&
    eventTarget.parentNode.nextSibling
  ) {
    const focusTarget = eventTarget.parentNode.nextSibling;
    changePlaceFoucs({ target: focusTarget });
    return;
  }

  /* 구분선 이동 */
  if (nextTarget && nextTarget.className === "divisionLine") {
    const divisionNextTarget = nextTarget.nextSibling;
    changePlaceFoucs({ target: divisionNextTarget });
    return;
  }

  /* 기본 이동 */
  changePlaceFoucs({ target: nextTarget });
  return;
}
