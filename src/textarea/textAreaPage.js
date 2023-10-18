import { DUMMY_DATA_TEXT_CONTENT } from "../utils/api.js";

const $ = document;
export default function TextAreaPage({ $target, initialState }) {
  const $textArea = $.createElement("div");
  $textArea.className = "textArea";

  this.state = initialState;
  console.log(this.state);

  this.setState = (nextState) => {
    $textArea.innerHTML = "";
    this.state = nextState;
    console.log(nextState);

    this.render();
  };

  this.render = () => {
    const $titleInputArea = $.createElement("input");
    $titleInputArea.className = "textArea-title";
    $titleInputArea.type = "text";
    $titleInputArea.name = "title";
    if (this.state.title) {
      $titleInputArea.value = this.state.title;
    } else {
      $titleInputArea.value = "Loading...";
    }
    // <input type="text" name="title" style="width:600px;" value="${this.state.title}" />
    // <textarea name="content" style="width:600px;height:400px;"
    const $contentTextArea = $.createElement("textarea");
    $contentTextArea.className = "textArea-content";
    $contentTextArea.name = "content";
    if (this.state.title) {
      $contentTextArea.value = this.state.content;
    } else {
      $contentTextArea.value = "";
    }

    $textArea.appendChild($titleInputArea);
    $textArea.appendChild($contentTextArea);

    $target.appendChild($textArea);
    // console.log($target);
    // console.log(DUMMY_DATA_TEXT_CONTENT.title);
  };
}
