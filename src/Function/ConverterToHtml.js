import CreateEditTextElement from "../Components/PageViewer/Editor/CreateEditTextElement.js";

export default function converterToHtml({ state, target }) {
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

  new CreateEditTextElement({
    target,
    text: state,
  });
}
