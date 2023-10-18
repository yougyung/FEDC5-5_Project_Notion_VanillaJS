import { request } from "../api.js";
import DocumentList from "./DocumentList.js";

export default function Sidebar({ $target }) {
  const $sidebar = document.createElement("aside");
  $target.appendChild($sidebar);

  const sidebar = new DocumentList({
    $target: $sidebar,
    initialState: [],
  });

  const fetchDocuments = async () => {
    const documents = await request("");
    sidebar.setState(documents);
  };

  fetchDocuments();
}
