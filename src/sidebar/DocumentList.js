import { request } from "../api.js";
import Editor from "../textEditor/Editor.js";

export default function DocumentList({ $target, initialState, onDelete }) {
  const $documentList = document.createElement("section");
  $target.appendChild($documentList);

  const $app = document.querySelector("#app");

  const editor = new Editor({
    $target: $app,
    initialState: {
      title: "",
      content: "",
    },
  });

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $documentList.innerHTML = `
            <ul>
                ${this.state
                  .map(
                    (document) =>
                      `<li class="list-item" data-id=${document.id}>
                        ${document.title}
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

    if (target.classList.contains("delete-button")) {
      onDelete(id);
    } else if (target.classList.contains("add-button")) {
      const { id } = target;

      console.log("add!", id);
    } else if (target.classList.contains("list-item")) {
      const document = await request(`${id}`);

      editor.setState(document);
    }
  });

  this.render();
}
