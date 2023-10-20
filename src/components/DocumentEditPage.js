import { request } from "../utils.js";
import DocumentHeader from "./documentComponents/DocumentHeader.js";
import Editor from "./documentComponents/Editor.js";
import SubDocumentList from "./documentComponents/SubDocumentList.js";

export default function DocumentEditPage({ $target, initialState, onEdit }) {
  const $documentEditPage = document.createElement("section");

  $documentEditPage.className = "document-edit-page";

  this.state = initialState;

  const fetchDocument = async () => {
    const { title, content, documents } = await request(
      `${this.state.documentId}`
    );

    documentHeader.setState({
      title,
    });

    editor.setState({
      title,
      content,
    });

    subDocumentList.setState({
      documents,
    });
  };

  const documentHeader = new DocumentHeader({
    $target: $documentEditPage,
    initialState: {
      title: "",
    },
  });

  const editor = new Editor({
    $target: $documentEditPage,
    initialState: {
      title: "",
      content: "",
    },
    onEdit,
  });

  const subDocumentList = new SubDocumentList({
    $target: $documentEditPage,
    initialState: {
      documents: [],
    },
    // onRoute
  });

  this.setState = (nextState) => {
    this.state = nextState;

    if (this.state.documentId === "new") {
      editor.setState({
        title: "",
        content: "",
      });
    } else {
      fetchDocument();
    }

    this.render();
  };

  this.render = () => {
    if (!$target.querySelector("#document-edit-page")) {
      $target.appendChild($documentEditPage);
    }
  };
}
