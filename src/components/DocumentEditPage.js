import { request } from "../utils.js";
import {
  Editor,
  DocumentHeader,
  SubDocumentList,
} from "./documentComponents/DocumentComponents.js";

export default function DocumentEditPage({
  $target,
  initialState,
  onEdit,
  onDelete,
}) {
  const $documentEditPage = document.createElement("section");

  $documentEditPage.className = "document-edit-page";

  this.state = initialState;

  const fetchDocument = async () => {
    try {
      const { documentId } = this.state;
      const { id, title, content, documents } = await request(documentId);

      documentHeader.setState({
        ...documentHeader.state,
        id,
        title,
      });

      editor.setState({
        ...editor.state,
        title,
        content,
      });

      subDocumentList.setState({
        ...subDocumentList.state,
        documents,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const documentHeader = new DocumentHeader({
    $target: $documentEditPage,
    initialState: {
      id: 1,
      title: "",
    },
    onDelete,
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
