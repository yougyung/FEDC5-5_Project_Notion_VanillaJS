import Sidebar from "../layout/Sidebar.js";
import EditDocument from "../layout/EditDocument.js";
import {
  getAllDocumentLists,
  getDocumentContent,
  createDocument,
} from "../api/document.js";

export default function App({ $target }) {
  this.state = {
    documents: [],
    selectedDocument: {
      id: 0,
      title: "",
      createdAt: "",
      updatedAt: "",
    },
  };

  const updateState = async () => {
    const documents = await getAllDocumentLists();
    this.setState({ documents, selectedDocument: this.state.selectedDocument });
  };

  const sidebar = new Sidebar({
    $target,
    initialState: this.state.documents,
    onAdd: async (parentId) => {
      const newDocument = await createDocument({
        title: "제목 없음",
        parent: parentId,
      });
      if (parentId) {
        const parentDocument = await getDocumentContent(parentId);
        parentDocument.documents.push(newDocument);
      }
      await updateState();
    },
    onSelect: async (id) => {
      const selectedDocument = await getDocumentContent(id);
      this.setState({ ...this.state, selectedDocument });
    },
  });

  const editDocument = new EditDocument({
    $target,
    initialState: this.state.selectedDocument,
  });

  this.setState = (nextState) => {
    this.state = nextState;
    sidebar.setState(this.state.documents);
    editDocument.setState(this.state.selectedDocument);
  };

  updateState();
}
