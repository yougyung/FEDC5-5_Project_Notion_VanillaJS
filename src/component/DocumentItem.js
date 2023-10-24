import Button from "../common/Button.js";
import Title from "../common/Title.js";
import arrowIconSvg from "../svg/arrowIcon.js";
import plusIcon from "../svg/plusIcon.js";
import xIcon from "../svg/xIcon.js";
import { push } from "../utils/router.js";
import Storage from "../utils/storage.js";

export default function DocumentItem({
  $target,
  initialState,
  createDocument,
  removeDocument,
  depth,
}) {
  this.state = initialState;
  const $documentItem = document.createElement("div");
  $documentItem.dataset.id = this.state.id;
  $documentItem.classList.add("document-item");
  $documentItem.style.paddingLeft = `${depth > 0 ? depth * 20 : 10}px`;
  if (depth > 0) {
    $documentItem.classList.add("document-item-children");
  }
  const storage = new Storage(window.localStorage);
  $target.appendChild($documentItem);
  const getChildDocumentEl = () => {
    const { nextSibling } = $documentItem;
    if (
      nextSibling &&
      nextSibling.classList.contains("document-item-children")
    ) {
      return nextSibling;
    }
    return undefined;
  };
  const rotateSvg = () => {
    const arrowIcon = $documentItem.querySelector(".arrow-icon");
    arrowIcon.classList.toggle("rotate-90edge");
  };
  const onArrowBtnClick = (e) => {
    const childDocumentEl = getChildDocumentEl();
    if (!childDocumentEl) {
      return;
    }
    childDocumentEl.classList.toggle("display-none");
    rotateSvg();
    //버튼 하위에 아이콘이 있으니, 버튼부터 탐색
    const { id } = $documentItem.dataset;
    //이전의 isFolded값을 가져와서, 반대값으로 바꿔준다
    const { isFolded: savedIsFolded } = storage.getItem(id, { isFolded: true });
    console.log(savedIsFolded);
    storage.setItem(id, { isFolded: !savedIsFolded });
  };
  const isFoldedCheck = () => {
    const childDocumentEl = getChildDocumentEl();
    console.log(childDocumentEl);
    if (childDocumentEl) {
      const { isFolded } = storage.getItem($documentItem.dataset.id, {
        isFolded: true,
      });
      if (!isFolded) {
        childDocumentEl.classList.remove("display-none");
        rotateSvg();
      }
    }
  };
  this.render = () => {
    $documentItem.innerHTML = "";
    new Button({
      $target: $documentItem,
      attributes: [{ name: "class", value: "arrow-btn" }],
      content: arrowIconSvg,
      onClick: onArrowBtnClick,
    });
    new Title({
      $target: $documentItem,
      initialState: {
        href: `documents/${this.state.id}`,
        title: this.state.title,
      },
    });
    new Button({
      $target: $documentItem,
      content: xIcon,
      onClick: (e) => {
        removeDocument($documentItem.dataset.id);
        storage.removeItem($documentItem.dataset.id);
      },
    });
    new Button({
      $target: $documentItem,
      content: plusIcon,
      onClick: () => {
        createDocument($documentItem.dataset.id);
        storage.setItem($documentItem.dataset.id, { isFolded: false });
      },
    });
    this.state.documents.forEach(
      (document) =>
        new DocumentItem({
          $target,
          initialState: document,
          createDocument,
          removeDocument,
          depth: depth + 1,
        })
    );
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
