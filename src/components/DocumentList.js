import { push } from "../utils/router.js";

export default function DocumentList({ $target, initialState }) {
  const $documentlist = document.createElement("div");
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
                    <button class="add" type="button">+</button>
                </li>
                ${documents.length ? renderDocument(documents) : "No Pages"}`
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
      push(`/documents/${id}`);
    } else if (e.target.className === "add") {
      push(`/documents/new`);
    }
  });

  this.render();
}
