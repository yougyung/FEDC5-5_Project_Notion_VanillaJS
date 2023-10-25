import { setItem, getItem } from "../../storage/Storage.js";

export default function Editor({ $target, initialState, onEditing }) {
  const $div = document.createElement("div");
  $target.appendChild($div);
  $div.className = "editor-div";

  this.state = initialState;

  this.setState = (nextState) => {
    if (nextState.id === "index") {
      $div.innerHTML = "";
      return;
    }
    this.state = nextState;
    setItem("savepoint", this.state);
    this.render();
  };

  this.render = () => {
    if (!this.state.isRender) {
      // <<br 꺼내어쓰면 왜 안되지..
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

  $div.addEventListener("keyup", (e) => {
    const name = e.target.getAttribute("name");
    const nextState = {
      ...this.state,
      [name]: e.target.value,
    };
    this.setState(nextState);
    onEditing(nextState.id);
  });
}
