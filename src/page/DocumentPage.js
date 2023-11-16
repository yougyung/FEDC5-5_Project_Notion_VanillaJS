import Editor from "../component/Editor.js";
import Title from "../common/Title.js";
import { request } from "../utils/api.js";
import { push } from "../utils/handleRouteEvent.js";
import { getPathData } from "../utils/getPathData.js";
import { store } from "../main.js";
import { fetchCurrentDocumentAsync } from "../modules/documentsDuck.js";

// initialState : {doucmentId :null, document:null}
export default function DocumentPage({ $target, initialState }) {
  const [path, documentId = pathData] = getPathData();
  const $documentPage = document.createElement("div");
  $documentPage.classList.add("document-page");
  this.state = initialState;
  this.getElement = () => {
    return $documentPage;
  };
  store.dispatch(fetchCurrentDocumentAsync(documentId));
  const test = store.useSelector(
    (state) => state.documentsReducer.selectedDocument,
    this.render
  );
  this.fetchDocument = async (documentId) => {
    const document = await request(`/documents/${documentId}`);
    if (!document) {
      alert("존재하지 않는 문서군요?");
      push("/");
      return;
    }
    this.setState(document);
  };
  this.fetchDocument(documentId);
  this.setState = async (nextState) => {
    this.state = nextState;
    const { id, title } = this.state;
    this.render();
    documentHeader.setState({ href: id, title });
    editor.setState({
      ...this.state,
    });
    editor.richEditorState = {
      ...this.richEditorState,
      content: this.state.content,
    };
    editor.renderContent();
  };
  this.render = () => {
    $target.replaceChildren($documentPage);
  };

  const documentHeader = new Title({
    $target: $documentPage,
    initialState: {
      href: "",
      title: "",
    },
  });
  let timerOfSetTimeout = null;
  const editor = new Editor({
    $target: $documentPage,
    initialState: {
      title: "",
      content: "",
      contentBuffer: "",
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
        documentHeader.setState({ title: response.title });
      }, 1500);
    },
  });
}
