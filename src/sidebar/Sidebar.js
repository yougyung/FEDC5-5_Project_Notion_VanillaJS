import { request } from "../utils.js";
import DocumentAddButton from "./DocumentAddButton.js";
import DocumentList from "./DocumentList.js";
import SidebarHeader from "./SidebarHeader.js";

export default function Sidebar({ $target, initialState, onAdd, onDelete }) {
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
    onAdd,
  });

  const documentList = new DocumentList({
    $target: $sidebar,
    initialState: {
      documents: [],
      selectedDocumentId: this.state.selectedDocumentId,
    },
    onDelete,
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
