import { push } from "../utils/route.js";
import { request } from "../utils/api.js";

export default function DocumentList({
  $target,
  initialState,
}) {
  const $document = document.createElement("div");
  $document.setAttribute("class", "documents-container");

  $target.appendChild($document);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const documentPrint = (documents) => {
    let htmlString = "";
    documents.forEach((document) => {
      htmlString += `
        <div class="documents-item">
            <div class="document-item-title-wrap" data-id="${document.id}">
                <button class="toggle">></button>
                <span>${document.title}</span>
                <button class="add-document">➕</button>
            </div>
            <div class="documents-item fold">
                ${
                  document.documents && document.documents.length !== 0
                    ? documentPrint(document.documents)
                    : '<span class="end-document-item">하위 페이지 없음</span>'
                }
            </div>
        </div>
    `;
    });

    return htmlString;
  };

  this.render = () => {
    $document.innerHTML = `
        <button class="add-document">➕</button>
        <div class="document-items"></div>
    `;

    if (this.state.length === 0) {
      return;
    }

    $document.querySelector(".document-items").innerHTML = `
        ${documentPrint(this.state)}
    `;
  };

  this.render();

  $document.addEventListener("click", (e) => {
    const $documentItem = e.target.closest(".document-item-title-wrap");
    const id = $documentItem ? $documentItem.dataset.id : null;

    if (e.target.className === "add-document") {
      let state = { parentId: id };
      push("/document/new", state);
    } else if (e.target.className === "toggle") {
      const $hideItem = $documentItem.closest(".documents-item").children[1];
      if ($hideItem) {
        $hideItem.classList.toggle("fold");
        $hideItem.classList.toggle("show");
      }
    } else if ($documentItem) {
      push(`/document/${id}`);
    }
  });
}
