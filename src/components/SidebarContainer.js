import DocumentList from "./DocumentList.js";
import { request } from "../utils/api.js";
import Editor from "./Editor.js";

export default function SidebarContainer({ $target }) {
  const $sidebar = document.createElement("div");
  $target.appendChild($sidebar);

  const documentList = new DocumentList({
    $target: $sidebar,
    initialState: [],
  });

  this.render = async () => {
    const document = await request("/documents");
    documentList.setState(document);
  };

  this.render();
}
