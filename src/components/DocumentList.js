import { DOCUMENTS_ROUTE, NEW, NEW_PARENT } from "../utils/constants.js";
import { push } from "../utils/router.js";
import { setItem } from "../utils/storage.js";

export default function DocumentList({ $target, initialState }) {
  const $documentlist = document.createElement("div");
  $documentlist.className = "document-list";

  $target.appendChild($documentlist);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const renderDocument = (nextDocument) => `
        <ul>
            ${nextDocument
              .map(
                ({ id, title, documents }) => `
                <li data-id= ${id} class="document-item">
                    ${title}
                    <button class="add" type="button"><i class="fa-solid fa-plus add-icon"></i></button>
                </li>
                ${documents.length ? renderDocument(documents) : '<li class="no-subapage">페이지 없음</li>'}`
              )
              .join("")}
        </ul>
        `;

  this.render = () => {
    if (this.state.length > 0) {
      $documentlist.innerHTML = renderDocument(this.state);
    }
  };

  $documentlist.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const { id } = $li.dataset;
    if (e.target.className === "document-item") {
      push(`${DOCUMENTS_ROUTE}/${id}`);
    } else if (e.target.className === "add") {
      setItem(NEW_PARENT, id);
      push(`${DOCUMENTS_ROUTE}/${NEW}`);
    }
  });

  this.render();
}
