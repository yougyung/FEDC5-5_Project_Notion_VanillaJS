import { filterTitle } from "../../utils/filterTitle.js";

export default function DocumentHeader({ $target, initialState, onDelete }) {
  const $documentHeader = document.createElement("header");
  $documentHeader.className = "document-header";
  $target.appendChild($documentHeader);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { id, title } = this.state;
    $documentHeader.innerHTML = `
    <section class="document-header-left">${filterTitle(title, 23)}</section>
    <section data-id=${id} class="document-header-right">
        <i class="fa-regular fa-trash-can delete-button"></i>
    </section>
      `;
  };

  $documentHeader.addEventListener("click", (event) => {
    const { target } = event;
    const { id } = target.closest("section").dataset;

    if (target.classList.contains("delete-button")) {
      onDelete(id);
    }
  });

  this.render();
}
