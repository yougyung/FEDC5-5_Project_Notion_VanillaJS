import DocumentList from "./DocumentList.js";
import { request } from "../utils/api.js";
import { DOCUMENTS_ROUTE } from "../utils/constants.js";

export default function SidebarContainer({ $target }) {
  const $sidebar = document.createElement("div");
  $target.appendChild($sidebar);

  const documentList = new DocumentList({
    $target: $sidebar,
    initialState: [],
  });

  this.render = async () => {
    const document = await request(DOCUMENTS_ROUTE);
    documentList.setState(document);
  };

  this.render();
}
