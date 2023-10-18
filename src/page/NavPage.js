import DocumentList from "../component/DocumentList.js";
import { request } from "../utils/api.js";

export default function NavPage({
  $target,
  initialState,
  createDocument,
  deleteDocument,
}) {
  const $nav = document.createElement("nav");
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    $target.appendChild($nav);
    documentList.setState(this.state);
  };
  const documentList = new DocumentList({
    $target: $nav,
    initialState: this.state,
    createDocument,
    deleteDocument,
  });
}
