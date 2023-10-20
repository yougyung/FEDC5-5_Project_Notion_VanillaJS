import { request } from "../utils/api.js";
import Editor from "./Editor.js";

export default function ContentsPage({ $target, initialState }) {
  const $page = document.createElement("div");

  this.state = initialState;

  this.setState = async ({ documentsId }) => {
    // const res = await request(`/documents/${documentsId}`);
    // this.state = res;
    // editor.setState(this.state);
    this.state = initialState.filter((docu) => docu.id === +documentsId);
    editor.setState(this.state);
    this.render();
  };

  const editor = new Editor({ $target: $page, initialState: {} });

  this.render = () => {
    $target.appendChild($page);
  };
}
