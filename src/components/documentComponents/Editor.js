import { MAX_TITLE_LENGTH } from "../../constants.js";
import { filterTitle } from "../../utils/filterTitle.js";
import ContentInnerModal from "./documentLinkSearch/ContentInnerModal.js";

export default function Editor({ $target, initialState, onEdit }) {
  const $editor = document.createElement("section");
  $target.appendChild($editor);
  $editor.className = "editor";
  console.dir($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  $editor.innerHTML = `
  <h1 class="title" type="text" placeholder="제목 없음" contentEditable="true"></h1>
  <div class="content" placeholder="빈 페이지" contentEditable="true"></div>
`;

  this.render = () => {
    // if (!$target.querySelector(".editor")) {
    //   $target.appendChild($editor);
    // }

    const { title, content } = this.state;

    $editor.querySelector(".title").textContent = title;
    $editor.querySelector(".content").textContent = content;
  };

  $editor.addEventListener("input", (event) => {
    const selectedDocumentSidebarTitle = document.querySelector(".list-item.selected .list-item-title");
    const selectedDocumentHeaderTitle = document.querySelector(".document-header-left");

    const { target } = event;
    const value = target.classList.value;

    if (this.state[value] !== undefined) {
      const nextState = { ...this.state, [value]: value === "title" ? target.textContent : target.innerText };

      if (value === "content") {
        if (target.innerText.includes("/")) {
          const contents = target.innerText.split("/");
          const newContent = contents[contents.length - 1];
          console.dir(contents);
          if (newContent === "페이지링크") {
            const selectionStart = window.getSelection().anchorOffset;
            const $contentInnerModal = $editor.querySelector(".content-inner-modal");
            if (!$contentInnerModal) {
              new ContentInnerModal({ $target: $editor.querySelector(".content"), selectionStart, option: "command" });
            }
          }
          return;
        }
        this.setState(nextState);
        onEdit(nextState);
      } else {
        selectedDocumentSidebarTitle.textContent = filterTitle(this.state.title, MAX_TITLE_LENGTH.DOCUMENT_LIST_ITEM);
        selectedDocumentHeaderTitle.textContent = filterTitle(this.state.title, MAX_TITLE_LENGTH.DOCUMENT_HEADER);

        this.setState(nextState);
        onEdit(nextState);
      }
    }
  });

  $editor.addEventListener("keydown", (event) => {
    const { target, key } = event;

    if (key === "Enter" && target.classList.value === "content") {
      event.preventDefault();
      const range = window.getSelection().getRangeAt(0);
      const br = document.createElement("br");
      range.insertNode(br);
      range.setStartAfter(br);
      range.setEndAfter(br);
    }
  });

  this.render();
}
