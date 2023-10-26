import { push } from "../router.js";

export default function Footer({ $target, initialState }) {
  const $div = document.createElement("div");
  $div.classList.add("footer");
  $target.appendChild($div);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.footerTemplate = (documents) => {
    return `${documents
      .map(({ id, title }) => {
        return `<button data-id="${id}" class="child-item">${title}</button>`;
      })
      .join("")}`;
  };

  this.render = () => {
    $div.innerHTML = "";
    if (this.state.post) {
      const { documents } = this.state.post;
      $div.innerHTML = documents ? this.footerTemplate(documents) : "";
    }
  };

  this.render();

  $div.addEventListener("click", (e) => {
    const $button = e.target.closest("button");

    if ($button) {
      const { id } = $button.dataset;

      push(`/documents/${id}`);
    }
  });
}
