import Button from "../common/Button.js";
import Title from "../common/Title.js";
import arrowIconSvg from "../svg/arrowIcon.js";
import { push } from "../utils/router.js";

export default function DocumentItem({
  $target,
  initialState,
  createDocument,
  deleteDocument,
  depth,
}) {
  this.state = initialState;
  const $documentItem = document.createElement("div");
  $documentItem.dataset.id = this.state.id;
  $documentItem.classList.add("document-item");
  $documentItem.style.paddingLeft = `${depth > 0 ? depth * 20 : 10}px`;
  $target.appendChild($documentItem);
  this.render = () => {
    $documentItem.innerHTML = "";
    new Button({
      $target: $documentItem,
      attributes: [
        { name: "class", value: "arrow-btn" },
        { name: "data-name", value: "more" },
      ],
      content: arrowIconSvg,
      onClick: (e) => {
        const { nextSibling } = $documentItem;
        if (
          nextSibling &&
          nextSibling.classList.contains("document-item-children")
        ) {
          nextSibling.classList.toggle("display-none");
          //버튼 하위에 아이콘이 있으니, 버튼부터 탐색
          const arrowIcon = e.currentTarget.querySelector("svg");
          arrowIcon.classList.toggle("rotate-90edge");
        }
      },
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
      attributes: [{ name: "data-name", value: "remove-doc" }],
      content: "-",
      onClick: (e) => {
        deleteDocument($documentItem.dataset.id);
      },
    });
    new Button({
      $target: $documentItem,
      attributes: [{ name: "data-name", value: "create-doc" }],
      content: "+",
      onClick: (e) => {
        createDocument($documentItem.dataset.id);
      },
    });
  };
  $documentItem.addEventListener("click", (e) => {
    //버튼 누를시 버튼의 부모(li) id의 하위 문서 생성..
    if (e.target.tagName === "A") {
      e.preventDefault();
    }
    if (e.target.tagName !== "BUTTON") {
      push(`/documents/${$documentItem.dataset.id}`);
    }
  });
  this.render();
}
