import { request } from "../utils/api.js";
import DocumentList from "./DocumentList.js";
import SidebarHeader from "./SidebarHeader.js";

export default function Sidebar({ $target, onAdd, onDelete }) {
  const $sidebar = document.createElement("aside");
  $target.appendChild($sidebar);

  new SidebarHeader({
    $target: $sidebar,
    username: "Roto",
  });

  const documentList = new DocumentList({
    $target: $sidebar,
    initialState: [],
    onDelete: onDelete,
  });

  const fetchDocuments = async () => {
    const documents = await request("");

    this.state = documents;
    documentList.setState(documents);
  };

  fetchDocuments();
}
