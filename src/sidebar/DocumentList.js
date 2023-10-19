import { push } from "../utils.js";

export default function DocumentList({ $target, initialState, onDelete }) {
  const $documentList = document.createElement("section");
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    // console.log(this.state.selectedDocumentId);
    this.render();
  };

  this.render = () => {
    $documentList.innerHTML = `
            <ul>
                ${this.state.documents
                  .map(
                    (document) =>
                      `<li class="list-item" data-id=${document.id}>
                        ${document.title ?? "제목 없음"}
                        <div class="list-item-buttons">
                        <button class="delete-button" type="button">
                          <i class="fa-regular fa-trash-can delete-button"></i>
                        </button>
                      <button class="add-button" type="button">+</button>
                      </div>
                      </li>`
                  )
                  .join("")}
            </ul>
        `;
  };

  $documentList.addEventListener("click", async (event) => {
    event.stopPropagation();
    const { target } = event;
    const $li = target.closest("li");

    let { id } = $li.dataset;
    id = parseInt(id);
    this.state.selectedDocumentId = id;

    if (target.classList.contains("delete-button")) {
      onDelete(id);
    } else if (target.classList.contains("add-button")) {
      // 하위 document 생성 로직
      const { id } = target;

      console.log("add!", id);
    } else if (target.className === "list-item") {
      // document open 로직
      push(`${id}`);

      this.setState({
        ...this.state,
        selectedDocumentId: id,
      });
    }
  });

  this.render();
}
