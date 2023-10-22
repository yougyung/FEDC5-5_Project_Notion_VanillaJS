import DocumentItem from "./DocumentItem.js";

export default function DocumentList({
  $target,
  initialState,
  createDocument,
  deleteDocument,
  depth = 0,
}) {
  const $documentList = document.createElement("div");
  $documentList.classList.add("document-list");
  depth > 0 &&
    $documentList.classList.add("document-item-children", "display-none");
  $target.appendChild($documentList);
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    $documentList.innerHTML = "";
    this.state.forEach((document) => {
      new DocumentItem({
        $target: $documentList,
        initialState: document,
        createDocument,
        deleteDocument,
        depth,
      });
      if (document.documents.length) {
        new DocumentList({
          $target: $documentList,
          initialState: document.documents,
          createDocument,
          deleteDocument,
          depth: depth + 1,
        });
      }
    });
  };
  this.render();
}
