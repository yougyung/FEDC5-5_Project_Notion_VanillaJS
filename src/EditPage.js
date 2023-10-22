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
    },
  });

  this.render = () => {
    $div.innerHTML = "edit 페이지";
  };
}
