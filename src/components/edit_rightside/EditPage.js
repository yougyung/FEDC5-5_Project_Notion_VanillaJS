import Editor from "./Editor.js";
import LinkChildPost from "../link_rightside/LinkChildPost.js";

export default function EditPage({ $target, initialState, onNewTitle }) {
  // const $div = document.createElement("div");
  // $target.appendChild($div);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    if (this.state.id === "index") {
      editor.setState({ id: "index" });
      return;
    }
    editor.setState(nextState);
    linkChildPost.setState(nextState);
  };

  const editor = new Editor({
    $target,
    initialState: {
      title: "",
      content: "",
    },
    onEditing: (id) => {
      onNewTitle(id);
    },
  });

  const linkChildPost = new LinkChildPost({ $target, initialState });
}
