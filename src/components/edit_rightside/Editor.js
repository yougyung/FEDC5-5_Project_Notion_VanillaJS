import { setItem } from "../../storage/Storage.js";

export default function Editor({ $target, initialState, onEditing }) {
  const $div = document.createElement("div");
  $target.appendChild($div);
  $div.className = "editor-div";

  this.state = initialState;

  this.setState = (nextState) => {
    // index를 전달받았다면, 빈 화면
    if (nextState.id === "index") {
      $div.innerHTML = "";
      return;
    }
    this.state = nextState;
    // 로컬에 현재 상태 저장
    setItem("savepoint", this.state);
    this.render();
  };

  this.render = () => {
    if (!this.state.isRender) {
      // 리렌더되면서 편집기 선택이 풀리는 것을 방지함
      this.state.isRender = true;
      $div.innerHTML = `
            <input placeholder="제목 없음" name="title" type="text" class="title-area" value="${
              this.state.title
            }"></input><p><p>
            <textarea placeholder="내용을 입력해주세요." name="content" class="content-area"">${
              this.state.content ?? ""
            }</textarea>
            `;
    }
  };

  // keyup 이벤트 핸들러
  $div.addEventListener("keyup", (e) => {
    const name = e.target.getAttribute("name");
    const nextState = {
      ...this.state,
      [name]: e.target.value,
    };
    this.setState(nextState); // 계속해서 로컬에 저장됨
    onEditing(nextState.id);
  });
}
