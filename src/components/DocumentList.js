import { DOCUMENTS_ROUTE, NEW, NEW_PARENT, UNTITLED, ADD } from "../utils/constants.js";
import { push } from "../utils/router.js";
import { getItem, setItem } from "../utils/storage.js";

const DOCUMENT_ITEM = "document-item";
const DELETE = "delete";
const OPENED_ITEM = "opened-item";

export default function DocumentList({ $target, initialState, onRemove }) {
  const $documentlist = document.createElement("div");
  $documentlist.className = "document-list";

  $target.appendChild($documentlist);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const textIndent = (depth) => 12 * depth; // 들여쓰기

  let isBlock = false;

  const renderButton = (id) => {
    const openedItems = getItem(OPENED_ITEM, []);
    if (openedItems.includes(String(id))) {
      isBlock = true;
      return `
        <button class="toggle open" type="button">
          <i class="toggle open fa-solid fa-angle-down"></i>
        </button>
      `;
    } else {
      isBlock = false;
      return `
        <button class="toggle" type="button">
          <i class="toggle fa-solid fa-angle-right"></i>
        </button>
      `;
    }
  };

  const renderDocuments = (nextDocuments, depth) => `
    ${nextDocuments
      .map(
        ({ id, title, documents }) => `
        <ul>
          <li
            data-id= "${id}" 
            class="${DOCUMENT_ITEM}"
            style="padding-left: ${textIndent(depth)}px">
            ${renderButton(id)}
            ${title.length > 0 ? title : UNTITLED}
            <span class = "buttons">
              <button class="${DELETE}" type="button">
                <i class="fa-regular fa-trash-can ${DELETE}"></i>
              </button>
              <button class="${ADD}" type="button">
                <i class="fa-solid fa-plus ${ADD}"></i>
              </button>
            </span>
          </li>
          ${
            isBlock && documents.length
              ? renderDocuments(documents, depth + 2)
              : `<li class="no-subpages"
                      style="padding-left: ${textIndent(depth + 2)}px; 
                      display: ${isBlock ? "block" : "none"};">
                      하위 페이지 없음
                      </li>`
          }
        </ul>`
      )
      .join("")}
    `;

  this.render = () => {
    if (!Array.isArray(this.state)) return;
    $documentlist.innerHTML = `
      ${this.state.length > 0 ? renderDocuments(this.state, 0) : ""}
    `;
  };

  $documentlist.addEventListener("click", (e) => {
    const { target } = e;
    const $li = target.closest("li");
    console.log($li.children);
    if (!$li) return;

    const { id } = $li.dataset;
    const openedItems = getItem(OPENED_ITEM, []);
    if (target.className === DOCUMENT_ITEM) {
      push(`${DOCUMENTS_ROUTE}/${id}`);
    } else if (e.target.classList.contains(ADD)) {
      setItem(NEW_PARENT, id);
      push(`${DOCUMENTS_ROUTE}/${NEW}`);
    } else if (target.classList.contains(DELETE)) {
      onRemove(id);
    }

    if (!target.classList.contains("toggle")) return;

    console.log(target);

    if (target.classList.contains("open")) {
      const index = openedItems.indexOf(String(id));
      setItem(OPENED_ITEM, [...openedItems.slice(0, index), ...openedItems.slice(index + 1)]);
      target.classList.toggle("open");
      this.render();
    } else {
      setItem(OPENED_ITEM, [...openedItems, id]);
      target.classList.toggle("open");
      this.render();
    }
  });

  const toggleBlock = (e) => {
    const $li = e.target.closest("li");
    if (!$li) return;

    for (const node of $li.children) {
      if (node.classList.contains("buttons")) {
        node.classList.toggle("block");
        return;
      }
    }
  };

  $documentlist.addEventListener("mouseover", toggleBlock);
  $documentlist.addEventListener("mouseout", toggleBlock);

  this.render();
}
