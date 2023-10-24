import CreateEditTextElement from "../Components/PageViewer/Editor/CreateEditTextElement.js";

export default function converterToHtml({ text, target }) {
  /* 제목 관련 */
  /* h1 요소 생성 */
  if (text.indexOf("# ") === 0) {
    const replacedText = text.replace(/#./, "");
    return new CreateEditTextElement({
      target,
      text: replacedText,
      className: "h1",
    });
  }

  /* h2 요소 생성 */
  if (text.indexOf("## ") === 0) {
    const replacedText = text.replace(/##./, "");
    return new CreateEditTextElement({
      target,
      text: replacedText,
      className: "h2",
    });
  }

  /* h3 요소 생성 */
  if (text.indexOf("### ") === 0) {
    const replacedText = text.replace(/###./, "");
    return new CreateEditTextElement({
      target,
      text: replacedText,
      className: "h3",
    });
  }

  /* 구분선 관련 */
  if (text.indexOf("<divisionLine>") === 0) {
    return new CreateEditTextElement({
      target,
      className: "divisionLine",
      noContentEdit: true,
    });
  }

  if (text.indexOf("<callOut>") === 0) {
    const replacedText = text.replace(/<callOut>/, "");
    const callBox = new CreateEditTextElement({
      target,
      className: "callBox",
      noContentEdit: true,
    });

    const emojiBox = new CreateEditTextElement({
      target: callBox.getElement(),
      className: "callBox_emoji",
      text: "💡",
      noContentEdit: true,
      element: "span",
    });

    new CreateEditTextElement({
      target: callBox.getElement(),
      text: replacedText,
      className: "callBox_textBox",
      focusTarget: emojiBox.getElement(),
      element: "span",
    });
    return;
  }

  /* 일반 Text */
  return new CreateEditTextElement({
    target,
    text: text,
  });
}
