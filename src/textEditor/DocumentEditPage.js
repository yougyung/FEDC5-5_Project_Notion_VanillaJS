import { request } from "../utils.js";
import Editor from "./Editor.js";

export default function DocumentEditPage({ $target, initialState, onEdit }) {
  const $documentEditPage = document.createElement("section");
  this.state = initialState;

  const fetchDocument = async () => {
    const { title, content } = await request(`${this.state.documentId}`);
    editor.setState({
      title,
      content,
    });
  };

  const editor = new Editor({
    $target,
    initialState: {
      title: "",
      content: "",
    },
    onEdit,
  });

  this.setState = (nextState) => {
    this.state = nextState;

    if (this.state.documentId === "new") {
      editor.setState({
        title: "",
        content: "",
      });
    } else {
      fetchDocument();
    }

    this.render();
  };

  this.render = () => {
    $target.appendChild($documentEditPage);
  };
}
