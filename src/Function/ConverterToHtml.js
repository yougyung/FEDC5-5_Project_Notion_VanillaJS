import CreateEditTextElement from "../Components/PageViewer/Editor/CreateEditTextElement.js";

export default function converterToHtml({ state, target }) {
  /* 제목 관련 */
  /* h1 요소 생성 */
  if (state.indexOf("# ") === 0) {
    const text = state.replace(/#./, "");
    return new CreateEditTextElement({
      target,
      text,
      className: "h1",
    });
  }

  /* h2 요소 생성 */
  if (state.indexOf("## ") === 0) {
    const text = state.replace(/##./, "");
    return new CreateEditTextElement({
      target,
      text,
      className: "h2",
    });
  }

  /* h3 요소 생성 */
  if (state.indexOf("### ") === 0) {
    const text = state.replace(/###./, "");
    return new CreateEditTextElement({
      target,
      text,
      className: "h3",
    });
  }

  if (state.indexOf("<divisionLine>") === 0) {
    return new CreateEditTextElement({
      target,
      className: "divisionLine",
      noContentEdit: true,
    });
  }
  /* 구분선 관련 */

  /* 일반 Text */
  new CreateEditTextElement({
    target,
    text: state,
  });
}
