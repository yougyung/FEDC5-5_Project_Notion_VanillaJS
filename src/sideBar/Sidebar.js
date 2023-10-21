import DocumentList from "../sideBar/DocumentList.js";
import { request } from "../utils/api.js";
import { ROUTE_DOCUMENTS } from "../utils/contants.js";

export default function Sidebar({ $target }) {
  const $sidebar = document.createElement("div");

  $target.appendChild($sidebar);

  const documentList = new DocumentList({
    $target: $sidebar,
    initialState: [],
  });

  this.render = async () => {
    const documents = await request(ROUTE_DOCUMENTS);
    documentList.setState(documents);
  };

  this.render();
}
