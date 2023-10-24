import Storage from "../utils/storage.js";
import DocumentItem from "./DocumentItem.js";

export default function DocumentList({
  $target,
  initialState,
  createDocument,
  removeDocument,
}) {
  const $documentList = document.createElement("div");
  this.state = initialState;
  $target.appendChild($documentList);
  $documentList.classList.add("document-list");
  /*  const isFoldedCheck = () => {
    const parentDocument = $documentList.previousSibling;
    if (parentDocument && parentDocument.classList.contains("document-item")) {
      const storage = new Storage(window.localStorage);
      //부모문서의 data-id값으로 로컬스토리지에서 isFolded(접혔는지) 값을 꺼내온다.
      const { isFolded } = storage.getItem(parentDocument.dataset.id, {
        isFolded: true,
      });
      //접히지 않았다면, display-none을 지워준다
      if (!isFolded) {
        $documentList.classList.remove("display-none");
      }
      console.log(isFolded);
      return isFolded;
    }
  }; */
  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);
    this.render();
  };
  let documentItem;
  this.render = () => {
    //상태가 바뀔때, 렌더가 일어난다. 비워두지 않으면 현재 상태+새로운 상태가 되어 노드가 2배 생김
    $documentList.innerHTML = "";
    this.state.forEach((document) => {
      //렌더할때, 로컬스토리지를 보고 display-none클래스를 결정해야함..
      documentItem = new DocumentItem({
        $target: $documentList,
        initialState: document,
        createDocument,
        removeDocument,
        depth: 0,
      });
    });
  };
  this.render();
}
