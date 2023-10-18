import DocumentItem from "./DocumentItem.js";

export default function DocumentList({
  $target,
  initialState,
  createDocument,
  deleteDocument,
  depth = 0,
}) {
  const $documentList = document.createElement("div");
  $documentList.className = "document-child";
  $target.appendChild($documentList);
  this.state = initialState;
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
      if (document.documents.length > 0) {
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
