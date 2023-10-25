import { fetchDocuments } from "../../utils/api.js";
import Editor from "./Editor.js";
import { NEW, DOCUMENTS_ROUTE, DEFAULT_DOCUMENT_ID } from "../../utils/constants.js";
import DocumentHeader from "./DocumentHeader.js";
import DocumentFooter from "./DocumentFooter.js";
import { setDocumentTitle } from "../../utils/validation.js";

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

  const editor = new Editor({
    $target: $page,
    initialState: {
      title: "",
      content: "",
    },
    onEdit,
  });

  const documentFooter = new DocumentFooter({
    $target: $page,
    initialState: {
      document: null,
    },
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
      documentFooter.setState({
        document: this.state.document,
      });
      documentHeader.setState({
        documentId: this.state.documentId,
        title: this.state.document.title || "",
      });
      this.render();
      return;
    }

    this.state = { ...this.state, ...nextState };

    if (this.state.documentId === NEW) {
      editor.setState({
        title: "",
        content: "",
      });
      documentHeader.setState({
        documentId: this.state.documentId,
        title: "",
      });
      documentFooter.setState({
        document: null,
      });
      this.render();
    } else {
      await loadDocument();
    }
  };

  const loadDocument = async () => {
    const document = await fetchDocuments(this.state.documentId);
    if (!document) {
      alert("존재하지 않는 페이지입니다.");
      push(`${ROUTE_DOCUMENTS}/${DEFAULT_DOCUMENT_ID}`);
      return;
    }

    this.setState({
      ...this.state,
      document,
    });
    documentFooter.setState({
      document: this.state.document,
    });
  };

  this.render = () => {
    $target.appendChild($page);
    setDocumentTitle(this.state.document?.title || "");
  };
}
