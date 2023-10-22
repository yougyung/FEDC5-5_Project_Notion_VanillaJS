import DocumentList from "../sideBar/DocumentList.js";
import DocumentAddButton from "./DocumentAddButton.js";
import { request } from "../utils/api.js";
import { ROUTE_DOCUMENTS } from "../utils/contants.js";
import SideHeader from "./SideHeader.js";

export default function Sidebar({ $target, onAdd }) {
  const $sidebar = document.createElement("div");

  $target.appendChild($sidebar);

  new SideHeader({
    initialState: {
      username: "kyungbin",
    },
    $target: $sidebar,
  });

  const documentList = new DocumentList({
    $target: $sidebar,
    initialState: [],
  });

  new DocumentAddButton({
    $target: $sidebar,
    onAdd,
  });

  this.render = async () => {
    const documents = await request(ROUTE_DOCUMENTS);
    documentList.setState(documents);
  };

  this.render();
}
