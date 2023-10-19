import Editor from "../component/Editor.js";
import Title from "../common/Title.js";
import { request } from "../utils/api.js";

// initialState : {doucmentId :null, document:null}
export default function DocumentPage({
  $target,
  initialState,
  documentAutoSave,
}) {
  const $documentPage = document.createElement("div");
  $documentPage.classList.add("document-page");
  this.stae = initialState;
  const fetchDocument = async (documentId) => {
    return await request(`/documents/${documentId}`);
  };
  this.setState = async (nextState) => {
    const document = await fetchDocument(nextState.id);
    this.state = document;
    this.render();
    const { id, title } = this.state;
    header.setState({ id, title });
    editor.setState(this.state);
  };
  this.render = () => {
    $target.appendChild($documentPage);
  };
  const header = new Title({
    $target: $documentPage,
    initialState: {
      title: "",
      id: null,
    },
  });
  const editor = new Editor({
    $target: $documentPage,
    initialState: {
      title: "",
      content: "",
    },
    documentAutoSave,
  });
}
