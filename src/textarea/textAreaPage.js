// 요기서 나오는 DOCS로 하위 페이지 버튼을 하단에 구현해 줄 수 있다.
const $ = document;
export default function TextAreaPage({ $target, initialState, onTextEditing, onTitleEditing }) {
  // 얘는 좀 나누자...textAreaTitle, 여기textAreaContent로 바꾸고, textAreaFooter
  const $textArea = $.createElement("div");
  $textArea.className = "textArea";

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render(); //너 렌더 금지
  };

  this.render = () => {
    $textArea.innerHTML = "";
    const $titleInputArea = $.createElement("input");
    $titleInputArea.className = "textArea-title";
    $titleInputArea.type = "text";
    $titleInputArea.name = "title";

    if (this.state.isLoading) {
      //대전제는 로딩
      console.log(this.state);
      $titleInputArea.value = "Title Loading...";
    } else {
      switch (this.state.pageType) {
        case "ROOT":
          $titleInputArea.value = this.state.title;
          $titleInputArea.readOnly = true;
          break;
        case "NOT_ROOT":
          if (this.state.title) {
            $titleInputArea.value = this.state.title;
          } else {
            $titleInputArea.placeholder = "제목 없음";
          }
          $titleInputArea.readOnly = false;
          break;
        default:
          break;
      }
    }

    const $contentTextArea = $.createElement("textarea");
    $contentTextArea.className = "textArea-content";
    $contentTextArea.name = "content";

    if (this.state.isLoading) {
      // 여기도 대전제는 로딩
      $contentTextArea.value = "Content Loading...";
    } else {
      switch (this.state.pageType) {
        case "ROOT":
          $contentTextArea.value = this.state.content;
          $contentTextArea.readOnly = true;
          break;
        case "NOT_ROOT":
          if (this.state.content) {
            $contentTextArea.value = this.state.content;
          } else {
            $contentTextArea.placeholder = "빈 페이지입니다. 내용을 입력해주세요.";
          }
          $contentTextArea.readOnly = false;
          break;
        default:
          break;
      }
    }

    $textArea.appendChild($titleInputArea);
    $textArea.appendChild($contentTextArea);

    if (this.state.pageType === "NOT_ROOT") {
      $titleInputArea.addEventListener("keyup", (e) => {
        this.state.title = $titleInputArea.value;
        this.state.content = $contentTextArea.value;
        onTitleEditing(this.state.id, this.state.content, e.target, e.key);
      });

      $contentTextArea.addEventListener("keyup", (e) => {
        this.state.title = $titleInputArea.value;
        this.state.content = $contentTextArea.value;
        // console.log(e.target.value);
        // console.log(this.state);
        onTextEditing(this.state.id, this.state.title, e.target.value);
      });
    }

    $target.appendChild($textArea);
  };
}
