import { fetchDocuments, request } from "../utils/api.js";
import { getItem, removeItem, setItem } from "../utils/storage.js";
import Editor from "./Editor.js";
import { NEW, NEW_PARENT, DOCUMENTS_ROUTE } from "../utils/constants.js";
import DocumentHeader from "./DocumentHeader.js";

export default function DocumentEditPage({ $target, initialState, onDelete, onEdit }) {
  const $page = document.createElement("div");
  $page.className = "document-edit-page";

  this.state = initialState;

  const documentHeader = new DocumentHeader({
    $target: $page,
    initialState: {
      documentId: this.state.documentId,
      title: this.state.document.title,
    },
    onDelete,
  });

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: {
      title: "",
      content: "",
    },
    onEdit,
  });

  history.replaceState({
    $target: $page,
    initialState: "자식 요소 렌더링",
  });

  this.setState = async (nextState) => {
    if (this.state.documentId === nextState.documentId) {
      this.state = { ...this.state, ...nextState };
      editor.setState(
        this.state.document || {
          title: "",
          content: "",
        }
      );
      documentHeader.setState({
        documentId: this.state.documentId,
        title: this.state.document.title || "",
      });
      this.render();
    } else {
      this.state = { ...this.state, ...nextState };
    }

    if (this.state.documentId === NEW) {
      editor.setState({
        title: "",
        content: "",
      });
      documentHeader.setState({
        documentId: this.state.documentId,
        title: "",
      });
      this.render();
    } else {
      await loadDocument();
    }
  };

  const loadDocument = async () => {
    const document = await fetchDocuments(this.state.documentId);

    this.setState({
      ...this.state,
      document,
    });
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
