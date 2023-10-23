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
  //자식이면, 자식임을 나타내는 클래스를 추가하고 숨기는 클래스도 추가한다.
  depth > 0 &&
    $documentList.classList.add("document-item-children", "display-none");
  $target.appendChild($documentList);
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
    documentItem.render();
  };
  let documentItem;
  this.render = () => {
    //상태가 바뀔때, 렌더가 일어난다. 비워두지 않으면 현재 상태+새로운 상태가 되어 노드가 2배 생김
    $documentList.innerHTML = "";
    this.state.forEach((document) => {
      //추상화와 rename이 필요하다.
      documentItem = new DocumentItem({
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
