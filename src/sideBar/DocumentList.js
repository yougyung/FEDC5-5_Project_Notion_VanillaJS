import { push } from "../utils/router.js";
import { NEW, ROUTE_DOCUMENTS } from "../utils/contants.js";
import { setItem, } from '../utils/storage.js';

export default function DocumentList({ $target, initialState }) {
  const $documentList = document.createElement("div");
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const renderDocuments = (nextDocuments) => `
      <ul>
        ${nextDocuments
          .map(
            ({ id, title, documents }) => `
              <li data-id="${id}" class="document-item">
                ${title ? title : "제목 없음"}
                <button class="add" type="button">+</button>
              </li>
              ${
                documents.length
                  ? renderDocuments(documents)
                  : "하위 항목 없음"
              }
            `
          )
          .join("")}
      </ul>
    `;

  this.render = () => {
    if (this.state.length > 0) {
      $documentList.innerHTML = renderDocuments(this.state);
    }
  };

  $documentList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    if (!$li) return;

    const { id } = $li.dataset;
    if (e.target.className === "document-item") {
      push(`${ROUTE_DOCUMENTS}/${id}`);
    } else if (e.target.className === "add") {
      setItem("NEW-PARENT", id)
      push(`${ROUTE_DOCUMENTS}/${NEW}`);
    }
  });

  this.render();
}