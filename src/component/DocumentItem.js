import Button from "../common/Button.js";
import Title from "../common/Title.js";
import arrowIconSvg from "../svg/arrowIcon.js";
import plusIcon from "../svg/plusIcon.js";
import xIcon from "../svg/xIcon.js";
import { push } from "../utils/router.js";
import Storage from "../utils/storage.js";
import DocumentList from "./DocumentList.js";

export default function DocumentItem({
  $target,
  initialState,
  createDocument,
  removeDocument,
  depth,
}) {
  this.state = initialState;
  const $documentItem = document.createElement("div");
  const $documentItemWrapper = document.createElement("div");
  $target.appendChild($documentItem);
  $documentItem.dataset.id = this.state.id;
  $documentItem.classList.add("document-item");
  $documentItemWrapper.classList.add("document-item-wrapper");
  $documentItem.style.paddingLeft = `${depth > 0 ? depth * 20 : 10}px`;
  const storage = new Storage(window.localStorage);

  const getChildDocuments = () => {
    const childDocuments = $documentItem.querySelector(".document-children");
    if (childDocuments) {
      return childDocuments;
    }
    return undefined;
  };
  const rotateSvg = () => {
    const arrowIcon = $documentItem.querySelector(".arrow-icon");
    arrowIcon.classList.toggle("rotate-90edge");
  };
  const onArrowBtnClick = () => {
    const childDocuments = getChildDocuments();
    if (!childDocuments) {
      return;
    }
    childDocuments.classList.toggle("display-none");
    rotateSvg();
    //버튼 하위에 아이콘이 있으니, 버튼부터 탐색
    const { id } = $documentItem.dataset;
    //이전의 isFolded값을 가져와서, 반대값으로 바꿔준다
    const { isFolded: savedIsFolded } = storage.getItem(id, { isFolded: true });
    console.log(savedIsFolded);
    storage.setItem(id, { isFolded: !savedIsFolded });
  };
  const isFoldedCheck = () => {
    const childDocuments = getChildDocuments();
    if (!childDocuments) return;
    const { isFolded } = storage.getItem($documentItem.dataset.id, {
      isFolded: true,
    });
    if (!isFolded) {
      childDocuments.classList.remove("display-none");
      rotateSvg();
    }
  };
  this.render = () => {
    $documentItem.innerHTML = "";
    $documentItem.appendChild($documentItemWrapper);
    new Button({
      $target: $documentItemWrapper,
      attributes: [{ name: "class", value: "arrow-btn" }],
      content: arrowIconSvg,
      onClick: onArrowBtnClick,
    });
    new Title({
      $target: $documentItemWrapper,
      initialState: {
        href: `documents/${this.state.id}`,
        title: this.state.title,
      },
    });
    new Button({
      $target: $documentItemWrapper,
      content: xIcon,
      onClick: (e) => {
        removeDocument($documentItem.dataset.id);
        storage.removeItem($documentItem.dataset.id);
      },
    });
    new Button({
      $target: $documentItemWrapper,
      content: plusIcon,
      onClick: () => {
        createDocument($documentItem.dataset.id);
        storage.setItem($documentItem.dataset.id, { isFolded: false });
      },
    });
    if (this.state.documents.length) {
      new DocumentList({
        $target: $documentItem,
        initialState: this.state.documents,
        createDocument,
        removeDocument,
        depth: depth + 1,
      });
    }
    isFoldedCheck();
  };
  $documentItem.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();
    }
    if (e.target.tagName !== "BUTTON") {
      push(`/documents/${$documentItem.dataset.id}`);
    }
  });
  this.render();
}
