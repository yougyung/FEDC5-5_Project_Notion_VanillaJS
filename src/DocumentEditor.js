import EditorFooterBar from "./EditorFooterBar.js";
import EditorStyle from "./EditorStyle.js";
import { push } from "./router.js";

export default function DocumentEditor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");

  this.state = initialState;

  let isinitialized = true;
  let lines = "";
  $editor.innerHTML = `
  
            <div class="editorDiv" >
              <h1><div contenteditable="true" name="title" placeholder="제목 없음" style="padding: 16px 24px;
        border-radius: 4px;">${this.state.title}</div></h1>
              <div contenteditable="true" name="content" style="display:block;width:600px;padding: 16px 24px;
        
        border-radius: 4px;">${this.state.content}</div>
            </div>
          `;

  $target.appendChild($editor);

  this.setState = (nextState) => {
    //아래 render를 한번만 하게되면 다른 문서를 클릭했을 때 새로운 데이터가 안그려지는 현상 해결
    if (this.state.id !== nextState.id) {
      isinitialized = true;
    }
    this.state = nextState;
    //render를 한번만 함으로써 커서가 계속 앞으로 가는 현상 해결
    if (isinitialized) {
      this.render();
      isinitialized = false;
    }
  };

  // 타이핑할 때마다 setState -> state값을 쿼리로 editable에 넣음
  // 타이핑 -> 2초후 setState -> state값을 쿼리로 editabledp 넣음 -> 2초 후에 커서가 다시 앞으로오겠지?>

  this.render = () => {
    const documentList =
      this.state.documentList &&
      this.state.documentList.map((document) => {
        return { id: document.id, title: document.title };
      });
    lines =
      this.state.content == null
        ? ""
        : this.state.content
            .split(/<div>|<\/div>|<br>/)
            .map((line) => {
              if (line.indexOf("# ") === 0) {
                return `<h1>${line.substring(2)}</h1>`;
              } else if (line.indexOf("## ") === 0) {
                return `<h2>${line.substring(3)}</h2>`;
              } else if (line.indexOf("### ") === 0) {
                return `<h3>${line.substring(4)}</h3>`;
              } else if (documentList.find((el) => el.title === line)) {
                const linkIndex = documentList.findIndex(
                  (doc) => doc.title === line
                );
                //contenteditable="false" 속성을 넣어서 링크버튼으로 변하면 버튼안의 텍스트를 편집 못하게 함
                return `<button contenteditable="false" id=${documentList[linkIndex].id} class="textLink" style="color:blue;cursor:pointer; readonly">@${line}</button>`;
              }
              return line;
            })
            .join("<br>");

    $editor.querySelector("[name=title]").innerHTML = this.state.title;
    $editor.querySelector("[name=content]").innerHTML = lines;
  };

  this.render();

  $editor.addEventListener("input", (e) => {
    const { target } = e;
    const name = target.getAttribute("name");
    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: target.innerHTML,
      };
      this.setState(nextState);
      onEditing(this.state);
    }
  });
  $editor.addEventListener("click", (e) => {
    if (e.target.className === "textLink") {
      push(`${e.target.id}`);
    }
  });

  //드래그 후 글씨체 스타일 변경 바 나오게 하는 기능(노션처럼)
  document.addEventListener("mouseup", () => {
    // console.log(document.getSelection());
  });

  const editorStyle = new EditorStyle({
    $target: document.querySelector(".editorDiv"),
    onStyle: (style) => {
      document.execCommand(style);
      $editor.focus({ preventScroll: true });
    },
  });
}

/*
1234567 에서 345를 드래그하면
아래처럼 로그 출력
anchor와 base는 커서의 시작 정보를, 
extent와 focus는 커서의 끝 정보를 가지고 있다.
anchorNode: text
anchorOffset: 2      -> 시작 오프셋
baseNode: text
baseOffset: 2      -> 시작 오프셋
extentNode: text
extentOffset: 5    -> 끝나는 오프셋
focusNode: text
focusOffset: 5     -> 끝나는 오프셋
isCollapsed: false   ->isCollapsed는 시작 커서와 끝 커서의 위치의 동일 여부를 판단해준다.
rangeCount: 1
type: "Range"
*/

/* 커서를 마지막으로 보내는 로직인데 사용하기에 부적합함, 무조건 커서를 마지막으로 감(수정가능하지만 불필요)
 
   const focusTargetDomElement = (target) => {
    try {
      target.focus();
      setEndOfContenteditable(target); // 해당 dom element를 넘겨만 주면된다
    } catch (e) {
      console.error(`focusing error: ${e.message}`);
    }
  };

  const setEndOfContenteditable = (contentEditableElement) => {
    var range, selection;
    if (document.createRange) {
      //Firefox, Chrome, Opera, Safari, IE 9+
      range = document.createRange(); //Create a range (a range is a like the selection but invisible)
      range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
      range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
      selection = window.getSelection(); //get the selection object (allows you to change selection)
      selection.removeAllRanges(); //remove any selections already made
      selection.addRange(range); //make the range you have just created the visible selection
    } else if (document.selection) {
      //IE 8 and lower
      range = document.body.createTextRange(); //Create a range (a range is a like the selection but invisible)
      range.moveToElementText(contentEditableElement); //Select the entire contents of the element with the range
      range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
      range.select(); //Select the range (make it the visible selection
    }
  };
 
 */
