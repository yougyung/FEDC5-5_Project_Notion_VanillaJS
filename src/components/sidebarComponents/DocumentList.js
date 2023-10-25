import { MAX_TITLE_LENGTH } from "../../constants.js";
import { push } from "../../utils.js";
import { filterTitle } from "../../utils/filterTitle.js";
import { ToggleButton } from "./ToggleButton.js";

export default function DocumentList({ $target, initialState, onAdd, onDelete }) {
  const $documentList = document.createElement("section");
  $documentList.className = "document-list-container";
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const { openIds, toggleButton, toggleDocumentList, openDocumentList } = ToggleButton();

  const listItemButtons = (id) => `
    <div class="list-item-buttons">
      <button data-id=${id} class="delete-button" type="button">
        <i class="fa-regular fa-trash-can delete-icon"></i>
      </button>
      <button data-id=${id} class="add-button" type="button">
        <i class="fa-solid fa-plus add-icon"></i>
      </button>
    </div>
  `;

  const renderList = (nextDocuments, depth) => `
    ${nextDocuments
      .map(
        ({ id, title, documents }) => `
            <ul class="document-list">
              <li data-id="${id}" class="list-item ${id === this.state.selectedDocumentId ? "selected" : ""}" style="padding-left: ${depth * 5}px;">
                <div class="toggle-and-title">
                ${toggleButton(id)}
                  <span class="list-item-title">
                  ${filterTitle(title, MAX_TITLE_LENGTH.DOCUMENT_LIST_ITEM)}
                  </span>
                </div>
                      ${listItemButtons(id)}
              </li>
                ${
                  openIds.includes(id)
                    ? documents.length === 0
                      ? `<li class="list-item no-subdocuments" style="padding-left: ${(depth + 2) * 10}px;">
                          하위 페이지 없음
                        </li>`
                      : renderList(documents, depth + 2)
                    : ""
                }
            </ul>
                  `
      )
      .join("")}
  `;

  this.render = () => {
    const { documents } = this.state;
    $documentList.innerHTML = `
           ${documents.length > 0 ? renderList(documents, 1) : ""}
        `;
  };

  $documentList.addEventListener("click", (event) => {
    const { target } = event;

    const $delete = target.closest(".delete-button");
    const $add = target.closest(".add-button");
    const $toggle = target.closest(".toggle-button");
    const $li = target.closest(".list-item");

    if ($toggle) {
      const { id } = $toggle.dataset;

      toggleDocumentList(parseInt(id));
      this.render();
    } else if ($delete) {
      const { id } = $delete.dataset;

      onDelete(parseInt(id));
    } else if ($add) {
      const { id } = $add.dataset;

      onAdd(parseInt(id));
      openDocumentList(parseInt(id));
    } else if ($li) {
      const { id } = $li.dataset;

      push(`${id}`);
    }
  });
}
