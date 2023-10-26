import { push } from "../utils/router.js";

export default function MatchedDocument({ $target, initialState }) {
  const $link = document.createElement("section");
  $target.appendChild($link);
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
  };
  window.addEventListener("input-change", (e) => {
    const { id, title } = e.detail;
    $link.innerHTML = `<span class="existTitle">${title}</span> 제목이 존재합니다.`;
    $link.addEventListener("click", (e) => {
      push(id);
      $link.innerHTML = "";
    });
  });
}
