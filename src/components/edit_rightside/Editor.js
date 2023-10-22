import { setItem, getItem } from "../../storage/Storage.js";

export default function Editor({ $target, initialState, onEditing }) {
  const $div = document.createElement("div");
  $target.appendChild($div);

  this.state = initialState;

  this.setState = (nextState) => {
    if (nextState.id === "index") {
      $div.innerHTML = "";
      return;
    } else {
      this.state = nextState;
      //   $div.querySelector("[name=title").value = this.state.title;
      //   $div.querySelector("[name=content]").value = this.state.content;
      setItem("savepoint", this.state);
      console.log(this.state.isRender);
      this.render();
    }
  };

  this.render = () => {
    if (!this.state.isRender) {
      // << 꺼내어쓰면 왜 안되지..
      this.state.isRender = true;
      $div.innerHTML = `
            <input name="title" type="text" value="${this.state.title}"></input>
            <textarea name="content" style="width: 400px; height: 500px">${this.state.content}</textarea>
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
    onEditing(nextState);
  });
}
