import { request } from "../api.js";
import Documents from "./Documents.js";

export default function Sidebar({ $target }) {
  const $sidebar = document.createElement("div");
  $sidebar.className = "sidebar";

  const documents = new Documents({
    $target: $sidebar,
    initialState: ["dasfdassdaf"],
  });

  this.setState = async () => {
    const getDocuments = await request("/documents");
    // documents.setState(getDocuments);
    this.render();
  };

  this.setState();

  this.render = () => {
    $target.appendChild($sidebar);
  };
}
