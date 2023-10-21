import { request } from "../api.js";
import DocumentUser from "./DocumentUser.js";
import DocumentList from "./DocumentList.js";

export default function DocumentPage({ $target }) {
  const $page = document.createElement("div");
  $page.classList.add("document-page");

  new DocumentUser({ $target: $page });
  const documentList = new DocumentList({ $target: $page, initialState: [] });

  this.setState = async () => {
    const documents = await request("/");
    documentList.setState(documents);
    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };

  this.setState();
}
