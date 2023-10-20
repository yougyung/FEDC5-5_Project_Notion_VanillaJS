import Editor from "../component/Editor.js";
import Title from "../common/Title.js";
import { request } from "../utils/api.js";

// initialState : {doucmentId :null, document:null}
export default function DocumentPage({ $target, initialState }) {
  const $documentPage = document.createElement("div");
  $documentPage.classList.add("document-page");
  this.state = initialState;
  const fetchDocument = async (documentId) => {
    const document = await request(`/documents/${documentId}`);
    this.setState(document);
  };
  fetchDocument(this.state.id);
  this.setState = async (nextState) => {
    this.state = nextState;
    const { id, title } = this.state;
    this.render();
    header.setState({ id, title });
    editor.setState(this.state);
  };
  this.render = () => {
    $target.replaceChildren($documentPage);
  };
  const header = new Title({
    $target: $documentPage,
    initialState: {
      title: "",
      id: null,
    },
  });
  let timerOfSetTimeout = null;
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
      }, 1500);
    },
  });
}
