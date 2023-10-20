import { setItem, getItem } from "./Storage.js";
import Index from "./index.js";

export default function Editor({ $target, initialState, onEditing }) {
  const $div = document.createElement("div");
  $target.appendChild($div);

  this.state = initialState;

  this.setState = (nextState) => {
    if (nextState.id === "index") {
      this.init();
    } else {
      this.state = nextState;
      console.log(this.state.title);
      //   $div.querySelector("[name=title").value = this.state.title;
      //   $div.querySelector("[name=content]").value = this.state.content;
      setItem("savepoint", this.state);
      this.render();
    }
  };

  let isAlreadyRender = false;

  this.init = () => {
    Index({ $target });
  };

  this.render = () => {
    if (!isAlreadyRender) {
      $div.innerHTML = `
            <input name="title" type="text" value="${this.state.title}"></input>
            <textarea name="content" style="width: 400px; height: 500px">${this.state.content}</textarea>
            `;
      isAlreadyRender = true;
    }
  };

  $div.addEventListener("keyup", (e) => {
    const name = e.target.getAttribute("name");
    const nextState = {
      ...this.state,
      [name]: e.target.value,
    };
    console.log(nextState);
    this.setState(nextState);
    onEditing(nextState);
  });
}
