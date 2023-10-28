import { getAllDocumentLists, createDocument } from "../api/document.js";

export default function Sidebar({ $target, initialState, onAdd, onSelect }) {
  const $sideContainer = document.createElement("div");
  $sideContainer.classList.add("side-container");
  $target.appendChild($sideContainer);

  this.state = initialState;

  const renderChildDocuments = (childDocuments) => {
    return `<div class="side-bar-leaf-documents" style="display: none;">
      ${
        childDocuments && childDocuments.length > 0
          ? childDocuments.map(renderDocuments).join("")
          : "하위 문서가 없습니다."
      }
    </div>`;
  };

  const renderDocuments = (document) => {
    const { id, title, documents: childDocuments } = document;
    return `
      <div class="side-bar-document" data-id="${id}">
        <img class="toggle-button" src="src/assets/arrow.png" alt="toggle button">
        <span class="click-title">${title}</span>
        <img class="add-button" src="src/assets/add.png"/>
        <img class="delete-button" src="src/assets/delete.png"/>
        ${renderChildDocuments(childDocuments)}
      </div>
    `;
  };

  const toggleDocument = (element) => {
    const $leafDocuments = element.querySelector(".side-bar-leaf-documents");
    const isVisible = $leafDocuments.style.display === "block";
    $leafDocuments.style.display = isVisible ? "none" : "block";
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $sideContainer.innerHTML = `
      <div class="side-bar-container">
        <h3 class="side-bar-header-title">김윤경의 Notion</h3>
        <button class="add-document">문서 추가</button>
        ${this.state.map(renderDocuments).join("")}
      </div>
    `;
  };

  $sideContainer.addEventListener("click", (e) => {
    const $node = e.target;
    const $parentDocument = $node.closest(".side-bar-document");

    if ($node.classList.contains("add-document")) {
      onAdd(null);
    } else {
      const $parentDocument = $node.closest(".side-bar-document");
      const { id } = $parentDocument.dataset;

      if ($node.classList.contains("click-title")) {
        onSelect(id);
      } else if ($node.classList.contains("toggle-button")) {
        toggleDocument($parentDocument);
      } else if ($node.classList.contains("add-button")) {
        onAdd(id);
      } else if ($node.classList.contains("delete-button")) {
        // 삭제 기능
      }
    }
  });

  this.render();
}
