import Editor from "./Editor.js";
import { request } from "./Api.js";
import { setItem, getItem } from "./Storage.js";
import Index from "./index.js";

export default function EditPage({
  $target,
  initialState,
  onNewTitle,
  onNewContent,
}) {
  const $div = document.createElement("div");
  $target.appendChild($div);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    if (this.state.id === "index") {
      editor.setState({ id: "index" });
      return;
    } else {
      console.log(nextState);
      editor.setState(nextState);
      this.render();
    }
  };

  let timer = null;

  const editor = new Editor({
    $target,
    initialState: {
      title: "",
      content: "",
    },
    onEditing: async (nextState) => {
      const { id } = nextState;
      onNewTitle(id);
      //   onNewContent(id);
      //   setItem("savepoint", nextState);
      //   if (timer != null) clearTimeout(timer);
      //   newContent = async (nextState) => {
      //     await request('',)
      //   };
      //   timer = setTimeout(async (nextState) => {
      //     console.log(nextState);
      //   }, 1000);
    },
    // onEditing : (nextState) => {
    //     setItem('localsavepoint', nextState);

    //     if (timer !== null) {
    //         clearTimeout(timer);
    //     }

    //     timer = setTimeout(async (nextState) => {
    //         request
    //     },3000)

    // }
  });

  this.render = () => {
    $div.innerHTML = "edit 페이지";
  };
}
