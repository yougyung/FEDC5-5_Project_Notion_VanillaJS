import { DOCUMENTS_ROUTE, NEW, NEW_PARENT, UNTITLED, ADD, DELETE, OPENED_ITEM } from "../../utils/constants.js";
import { push } from "../../utils/router.js";
import { getItem, setItem } from "../../utils/storage.js";

const DOCUMENT_ITEM = "document-item";
const BLOCK = "block";
const NONE = "none";

export default function DocumentList({ $target, initialState, onAdd, onDelete }) {
  const $documentList = document.createElement("div");
  $documentList.className = "document-list";
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  const generateTextIndent = (depth) => 10 * depth; // 들여쓰기

  let isBlock = false;

  const renderButton = (id) => {
    const openedItems = getItem(OPENED_ITEM, []);
    if (openedItems.includes(id)) {
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
                data-id="${id}" 
                class="${DOCUMENT_ITEM}" 
                style="padding-left: ${generateTextIndent(depth)}px">
                ${renderButton(id)}
                <p class="${DOCUMENT_ITEM}"> ${title.length > 0 ? title : UNTITLED} </p>
                <div class="buttons">
                  <button class="${DELETE}" type="button">
                    <i class="fa-regular fa-trash-can ${DELETE}"></i>
                  </button>
                  <button class="${ADD}" type="button">
                    <i class="fa-solid fa-plus ${ADD}"></i>
                  </button>
                </div>
              </li>
              ${
                isBlock && documents.length
                  ? renderDocuments(documents, depth + 2)
                  : `<li 
                      class="no-subpages" 
                      style="padding-left: ${generateTextIndent(depth + 2)}px; display: ${isBlock ? BLOCK : NONE};">
                      하위 페이지 없음
                    </li>`
              }
              </ul>
            `
          )
          .join("")}
    `;

  this.render = () => {
    const { documents } = this.state;

    $documentList.innerHTML = `
      ${documents.length > 0 ? renderDocuments(documents, 1) : ""}
    `;
  };

  $documentList.addEventListener("click", (e) => {
    const { target } = e;
    const $li = target.closest("li");
    if (!$li) return;

    let { id } = $li.dataset;
    id = parseInt(id);

    if (target.classList.contains(DOCUMENT_ITEM)) {
      push(`${DOCUMENTS_ROUTE}/${id}`);
    } else if (target.classList.contains(ADD)) {
      setItem(NEW_PARENT, id);
      onAdd(id);
      toggleOpen(target, id);
    } else if (target.classList.contains(DELETE)) {
      onDelete(id);
    }

    if (target.classList.contains("toggle")) {
      toggleOpen(target, id);
    }
  });

  const toggleOpen = (target, id) => {
    const openedItems = getItem(OPENED_ITEM, []);

    if (target.classList.contains("open")) {
      const index = openedItems.indexOf(id);
      setItem(OPENED_ITEM, [...openedItems.slice(0, index), ...openedItems.slice(index + 1)]);
      target.classList.toggle("open");
    } else {
      if (openedItems.indexOf(id) > -1) return; // 동일 id 중복 저장 에러
      setItem(OPENED_ITEM, [...openedItems, id]);
      target.classList.toggle("open");
    }
    this.render();
  };

  const toggleBlock = (e) => {
    const $li = e.target.closest("li");
    if (!$li) return;

    for (const node of $li.children) {
      if (node.classList.contains("buttons") || node.classList.contains(DOCUMENT_ITEM)) {
        node.classList.toggle(BLOCK);
      }
    }
  };

  $documentList.addEventListener("mouseover", toggleBlock);
  $documentList.addEventListener("mouseout", toggleBlock);

  this.render();
}
