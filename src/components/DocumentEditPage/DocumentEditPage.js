import { fetchDocuments } from "../../utils/api.js";
import Editor from "./Editor.js";
import { NEW, NEW_PARENT, DOCUMENTS_ROUTE } from "../../utils/constants.js";
import DocumentHeader from "./DocumentHeader.js";
import DocumentFooter from "./DocumentFooter.js";

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
  };
}
