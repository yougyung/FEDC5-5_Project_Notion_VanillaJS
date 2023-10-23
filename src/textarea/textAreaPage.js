// 요기서 나오는 DOCS로 하위 페이지 버튼을 하단에 구현해 줄 수 있다.
const $ = document;
export default function TextAreaPage({ $target, initialState, onTextEditing, onTitleEditing }) {
  const $textArea = $.createElement("div");
  $textArea.className = "textArea";

  this.state = initialState;
  // console.log(this.state);

  this.setState = (nextState) => {
    this.state = nextState;
    // console.log(nextState);
    this.render();
  };

  this.render = () => {
    $textArea.innerHTML = "";
    const $titleInputArea = $.createElement("input");
    $titleInputArea.className = "textArea-title";
    $titleInputArea.type = "text";
    $titleInputArea.name = "title";
    // console.log(this.state, `in textAreaPage`);
    // const $tempDiv = $.createElement("div");
    // $tempDiv.innerText = this.state.isLoading;
    // $textArea.appendChild($tempDiv);

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
      console.log(this.state);
    }
    //   if (this.state.title !== "DEFAULT") {
    //     if (this.state.title) {
    //       $titleInputArea.value = this.state.title;
    //     } else {
    //       $titleInputArea.placeholder = "제목 없음";
    //     }
    //   } else if (this.state.title === "DEFAULT") {
    //     console.log(`페이지 시작, title은 기본 안내`);
    //   } else {
    //     console.error(`타이틀 없음`);
    //   }
    // }
    // <input type="text" name="title" style="width:600px;" value="${this.state.title}" />
    // <textarea name="content" style="width:600px;height:400px;"
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
    // // console.log(this.state);
    // if (this.state.content !== "DEFAULT") {
    //   if (this.state.content) {
    //     $contentTextArea.value = this.state.content;
    //   } else {
    //     $contentTextArea.placeholder = "빈 페이지입니다. 내용을 입력해주세요.";
    //   }
    // } else if (this.state.content === "DEFAULT") {
    //   console.log(`페이지 시작, content는 기본 안내`);
    // }

    $textArea.appendChild($titleInputArea);
    $textArea.appendChild($contentTextArea);

    if (this.state.pageType === "NOT_ROOT") {
      $contentTextArea.addEventListener("keyup", (e) => {
        console.log(e.target.value);
        console.log(this.state);
        onTextEditing(this.state.id, this.state.title, e.target.value);
        // console.log(e.target.value);
        // console.log({ ...this.state });
        // this.setState({ ...this.state, content: e.target.value });
        // $.querySelector(".textArea-content").focus();
      });

      $titleInputArea.addEventListener("keyup", (e) => {
        onTitleEditing(this.state.id, this.state.content, e.target);
        // console.log(e.target);
        // this.setState({ ...this.state, title: e.target.value });
        // console.log(this.state);
        // $.querySelector(".textArea-title").focus();
        // console.log(this.state);
      });
    }

    $target.appendChild($textArea);
  };
  // 바뀌지 않는 것은 렌더 밖으로
  // 이벤트 는 밖으로
  // $textArea.addEventListener("click", (e) => {
  //   console.log(e.target);
  // });
}
