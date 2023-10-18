import Editor from "../component/Editor.js";
import { request } from "../utils/api.js";

// initialState : {doucmentId :null, document:null}
export default function DocumentPage({ $target, initialState }) {
  const $documentPage = document.createElement("div");
  $documentPage.classList.add("document-page");
  this.stae = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    editor.setState(this.state.document);
    this.render();
  };
  this.render = () => {
    $target.appendChild($documentPage);
  };
  //오른쪽 페이지
  const editor = new Editor({
    $target: $documentPage,
    initialState: {
      title: "",
      content: "",
    },
    documentAutoSave: (body) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        const response = await request("/documents", {
          method: "POST",
          body,
        });
      }, 1500);
    },
  });
}
