import EditorFooterBar from "./EditorFooterBar.js";
import EditorStyle from "./EditorStyle.js";

export default function DocumentEditor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");

  this.state = initialState;
  let isinitialized = true;
  $editor.innerHTML = `
  
            <div class="editorDiv" >
              <div contenteditable="true" name="title" placeholder="제목 없음" style="padding: 16px 24px;
        border: 1px solid #D6D6D6;
        border-radius: 4px;"><h1>${this.state.title}</h1></div>
              <div contenteditable="true" name="content" style="display:block;width:600px;height:400px;padding: 16px 24px;
        border: 1px solid #D6D6D6;
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
    $editor.querySelector("[name=title]").innerHTML = this.state.title;
    $editor.querySelector("[name=content]").innerHTML = this.state.content;
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

  const editorFooterBar = new EditorFooterBar({
    $target: document.querySelector("#root"),
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
