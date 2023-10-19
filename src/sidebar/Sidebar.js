import { request } from "../utils/api.js";
import DocumentAddButton from "./DocumentAddButton.js";
import DocumentList from "./DocumentList.js";
import SidebarHeader from "./SidebarHeader.js";

export default function Sidebar({ $target, initialState }) {
  const $sidebar = document.createElement("aside");
  $target.appendChild($sidebar);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  new SidebarHeader({
    $target: $sidebar,
    username: "Roto",
  });

  const documentAddButton = new DocumentAddButton({
    $target: $sidebar,
    initialState: {
      documentId: "new",
    },
  });

  const documentList = new DocumentList({
    $target: $sidebar,
    initialState: {
      documents: [],
      selectedDocumentId: this.state.selectedDocumentId,
    },
    onDelete: async (id) => {
      const documentIndex = this.state.documents.findIndex(
        (document) => document.id === id
      );

      const nextDocuments = [...this.state.documents];
      nextDocuments.splice(documentIndex, 1);

      // 낙관적 업데이트
      documentList.setState({ ...this.state, documents: nextDocuments });

      try {
        await request(`${id}`, {
          method: "DELETE",
        });
        console.log(id, ": 삭제 완료");
      } catch (error) {
        console.log(error);
        documentList.setState({
          documents: this.state.documents,
          selectedDocumentId: this.state.selectedDocumentId,
        });
      }
    },
  });

  this.render = async () => {
    const documents = await request("");
    documentList.setState({
      documents,
      selectedDocumentId: this.state.selectedDocumentId,
    });
  };

  this.render();
}
