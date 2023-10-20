// 요기서 나오는 DOCS로 하위 페이지 버튼을 하단에 구현해 줄 수 있다.
const $ = document;
export default function TextAreaPage({ $target, initialState }) {
  const $textArea = $.createElement("div");
  $textArea.className = "textArea";

  this.state = initialState;
  // console.log(this.state);

  this.setState = (nextState) => {
    $textArea.innerHTML = "";
    this.state = nextState;
    // console.log(nextState);
    this.render();
  };

  this.render = () => {
    const $titleInputArea = $.createElement("input");
    $titleInputArea.className = "textArea-title";
    $titleInputArea.type = "text";
    $titleInputArea.name = "title";
    // console.log(this.state, `in textAreaPage`);
    // const $tempDiv = $.createElement("div");
    // $tempDiv.innerText = this.state.isLoading;
    // $textArea.appendChild($tempDiv);

    if (this.state.isLoading) {
      $titleInputArea.value = "Title Loading...";
    } else {
      if (this.state.title !== "DEFAULT") {
        $titleInputArea.value = this.state.title;
      } else if (this.state.title === "DEFAULT") {
        console.log(`페이지 시작, title은 공란`);
      } else {
        console.error(`타이틀 없음`);
      }
    }
    // <input type="text" name="title" style="width:600px;" value="${this.state.title}" />
    // <textarea name="content" style="width:600px;height:400px;"
    const $contentTextArea = $.createElement("textarea");
    $contentTextArea.className = "textArea-content";
    $contentTextArea.name = "content";

    if (this.state.isLoading) {
      $contentTextArea.value = "Content Loading...";
    } else {
      if (this.state.title !== "DEFAULT") {
        if (this.state.content) {
          $contentTextArea.value = this.state.content;
        } else {
          $contentTextArea.placeholder = "빈 페이지입니다. 내용을 입력해주세요.";
        }
      } else if (this.state.title === "DEFAULT") {
        console.log(`페이지 시작, content는 공란`);
      }
    }

    $textArea.appendChild($titleInputArea);
    $textArea.appendChild($contentTextArea);

    $target.appendChild($textArea);
    // console.log($target);
    // console.log(DUMMY_DATA_TEXT_CONTENT.title);
  };
}
