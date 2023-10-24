import Storage from "../utils/storage.js";
import DocumentItem from "./DocumentItem.js";

export default function DocumentList({
  $target,
  initialState,
  createDocument,
  removeDocument,
  depth = 0,
}) {
  const $documentList = document.createElement("div");
  this.state = initialState;
  $target.appendChild($documentList);
  $documentList.classList.add("document-list");
  if (depth > 0) {
    $documentList.classList.add("document-children", "display-none");
  }
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    //상태가 바뀔때, 렌더가 일어난다. 비워두지 않으면 현재 상태+새로운 상태가 되어 노드가 2배 생김
    $documentList.innerHTML = "";
    this.state.forEach((document) => {
      new DocumentItem({
        $target: $documentList,
        initialState: document,
        createDocument,
        removeDocument,
        depth: depth + 1,
      });
    });
  };

  this.render();
}
