import { navigate } from "../../utils/router";

/** state : 하위 페이지 목록 [] */
export default function Footer({ $target, initialState }) {
  this.state = initialState;

  const $footer = document.createElement("div");

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $footer.innerHTML = `<div>
    ${this.state
      .map(
        document =>
          `<p data-id="${document.id}" class="sub-document">${document.title}</p>`,
      )
      .join("")}</div>`;

    $target.appendChild($footer);
  };

  /** 페이지 이동 */
  $footer.addEventListener("click", e => {
    const $documentLink = e.target.closest(".sub-document");

    if ($documentLink) {
      const { id } = $documentLink.dataset;
      navigate(`/documents/${id}`);
    }
  });
}
