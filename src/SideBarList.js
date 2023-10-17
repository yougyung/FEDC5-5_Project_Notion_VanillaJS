import { localStorageGetItem, localStorageSetItem } from "./utils/storage.js";

export default function SideBarList({ $target, initialState }) {
  const $sideBarList = document.createElement("div");
  $target.appendChild($sideBarList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const showSubLi = ({ $target, documents }) => {
    const $subUl = document.createElement("ul");
    $target.appendChild($subUl);
    documents.map((doc) => {
      const $subLi = document.createElement("li");
      $subLi.dataset.id = doc.id;
      $subLi.innerHTML = doc.title;
      $subUl.appendChild($subLi);
      if (doc.documents.length > 0) {
        const newDocuments = doc.documents;
        showSubLi({ $target: $subLi, documents: newDocuments });
      } else {
        return;
      }
    });
  };
  this.render = () => {
    const documents = this.state;
    showSubLi({ $target: $sideBarList, documents });
  };
  this.render();

  $sideBarList.addEventListener("click", (e) => {
    const { tagName } = e.target;
    if (tagName === "LI") {
      const li = e.target;
      const liChilds = li.childNodes ? li.childNodes[1] : null;
      if (liChilds) {
        liChilds.style.display =
          liChilds.style.display !== "none" ? "none" : "block";
      }
    }
  });
}
