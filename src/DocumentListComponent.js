import DocumentList from "./DocumentList.js";
import { request } from "./api.js";

export default function DocumentListComponent({ $target }) {
  const $page = document.createElement("div");

  $target.appendChild($page);

  this.setState = async () => {
    const lists = await request("/documents");
    documentList.setState({ selectedDocument: null, documentList: lists });
  };

  const documentList = new DocumentList({
    $target: $page,
  });
}
