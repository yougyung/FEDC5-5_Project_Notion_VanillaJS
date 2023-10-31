import Button from "../common/Button.js";
import Title from "../common/Title.js";
import { paddingCoefficient } from "../constants/paddingCoefficient.js";
import arrowIconSvg from "../svg/arrowIcon.js";
import plusIcon from "../svg/plusIcon.js";
import xIcon from "../svg/xIcon.js";
import { push } from "../utils/router.js";
import Storage from "../utils/storage.js";
import DocumentList from "./DocumentList.js";
import NoSubDocument from "./NoSubDocument.js";

export default function DocumentItem({
  $target,
  initialState,
  createDocument,
  removeDocument,
  depth,
  changeBackgroundSelectedDocument,
}) {
  this.state = initialState;
  const $documentItem = document.createElement("div");
  const $documentItemInner = document.createElement("div");
  $target.appendChild($documentItem);
  $documentItemInner.style.paddingLeft = `${
    depth > 0 ? depth * paddingCoefficient : paddingCoefficient
  }px`;
  $documentItem.dataset.id = this.state.id;
  $documentItem.classList.add("document-item");
  $documentItemInner.classList.add("document-item-inner");
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
    arrowIcon.classList.toggle("rotate-default");
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
    //렌더타임에 붙이지 않으면, 사라진다
    $documentItem.appendChild($documentItemInner);
    new Button({
      $target: $documentItemInner,
      attributes: [{ name: "class", value: "arrow-btn" }],
      content: arrowIconSvg,
      onClick: onArrowBtnClick,
    });
    new Title({
      $target: $documentItemInner,
      initialState: {
        href: `documents/${this.state.id}`,
        title: this.state.title,
      },
    });
    new Button({
      $target: $documentItemInner,
      content: xIcon,
      onClick: (e) => {
        removeDocument($documentItem.dataset.id);
        storage.removeItem($documentItem.dataset.id);
      },
    });
    new Button({
      $target: $documentItemInner,
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
        depth: depth,
      });
    } else {
      new NoSubDocument({
        $target: $documentItem,
        depth,
      });
    }
    //dom이 모두 생기고 난 후, 접기 체크
    isFoldedCheck();
  };
  $documentItemInner.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();
    }
    if (!e.target.closest("button")) {
      push(
        `/documents/${$documentItem.dataset.id}`,
        changeBackgroundSelectedDocument
      );
    }
  });
  this.render();
}
