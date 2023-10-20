import { push } from "../../utils.js";

export default function SubDocumentList({ $target, initialState }) {
  const $editorFooter = document.createElement("nav");
  $editorFooter.className = "editor-bottom-nav";
  $target.appendChild($editorFooter);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { documents } = this.state;
    $editorFooter.innerHTML = `
    <ul class="subdocument-list">
      ${documents.map(
        ({ id, title }) => `
        <li data-id=${id} class="subdocument-link">
          ${(title ?? "제목 없음") || (title === "" && "제목 없음")}
        </li>
        `
      )}
    </ul>
        `;
  };

  $editorFooter.addEventListener("click", (event) => {
    event.stopPropagation();

    const { target } = event;
    const $li = target.closest("li");

    let { id } = $li.dataset;
    id = parseInt(id);

    if (!isNaN(id)) {
      console.log(id);
      push(`${id}`);
    }
  });

  this.render();
}