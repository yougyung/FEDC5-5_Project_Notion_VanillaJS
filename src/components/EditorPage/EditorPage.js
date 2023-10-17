import Header from "./Header/Header";
import Editor from "./Editor/Editor";

import { getPost } from "../../utils/api";

export default function EditorPage({ $target, initialState = 100969 }) {
  const $editorPage = document.createElement("div");
  $editorPage.className = "editor-container";

  // 1) Header
  const header = new Header({ $target: $editorPage, initialState: [] });
  // 2) Editor
  //const editor = new Editor({ $target: $editorPage, initialState: {} });

  this.setState = async documentId => {
    console.log("setState 발생", documentId);

    const postData = await getPost(documentId);
    console.log("상세 >>", postData);
    //editor.setState(postData);
    this.render();
  };

  this.render = () => {
    $target.appendChild($editorPage);
  };
}
