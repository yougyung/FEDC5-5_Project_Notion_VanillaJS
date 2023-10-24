import { push } from "../../router/router.js";

export default function LinkChildPost({ $target, initialState }) {
  const $div = document.createElement("div");
  $target.appendChild($div);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    if (this.state.documents.length === 0) {
      $div.innerHTML = "하위 노드가 없습니다.!";
      return;
    }
    this.render();
  };

  this.render = () => {
    $div.innerHTML = `
        <span>하위 노드 보기</span>
        ${this.state.documents
          .map(({ id, title }) => `<span data-id=${id}>${title}</span>`)
          .join(" ")}
    `;
  };

  $div.addEventListener("click", (e) => {
    const $span = e.target.closest("span");

    if ($span.hasAttribute("data-id")) {
      const { id } = $span.dataset;
      push(id);
    }
  });
}
