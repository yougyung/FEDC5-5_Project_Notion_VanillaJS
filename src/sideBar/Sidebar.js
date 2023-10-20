import { request } from "../api.js";
import DocumentList from "./DocumentList.js";

export default function Sidebar({ $target }) {

  const $sidebar = document.createElement("div");
  
  $target.appendChild($sidebar);

  const documnetList = new DocumentList({
    $target: $sidebar,
    initialState: [],
  });

  const fetchDocuments = async () => {
    const documents = await request("");
    documnetList.setState(documents);
  };

  fetchDocuments();
}
