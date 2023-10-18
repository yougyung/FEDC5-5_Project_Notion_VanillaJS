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
  let timerOfSetTimeout;
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
    documentAutoSave: (documentId, requestBody) => {
      if (timerOfSetTimeout !== null) {
        clearTimeout(timerOfSetTimeout);
      }
      timerOfSetTimeout = setTimeout(async () => {
        const response = await request(`/documents/${documentId}`, {
          method: "PUT",
          body: JSON.stringify(requestBody),
        });
        console.log(response);
      }, 1500);
    },
  });
}
