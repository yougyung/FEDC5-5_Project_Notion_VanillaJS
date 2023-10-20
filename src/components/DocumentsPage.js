import DocumentsList from "./DocumentsList.js";
import { request } from "../utils/api.js";

export default function DocumentsPage({ $target, initialState }) {
  const $page = document.createElement("div");
  $page.style.backgroundColor = "";
  $target.appendChild($page);

  this.state = initialState;

  //   this.setState = async () => {
  //     const documents = await request("/documents");
  //     documentsList.setState(documents);
  //   };

  const documentsList = new DocumentsList({
    $target: $page,
    initialState: this.state,
  });
}
