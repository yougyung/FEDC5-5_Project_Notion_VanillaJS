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
    $editorFooter.innerHTML = `
      <ul>
        ${this.state.documents.map(
          ({ id, title }) => `
          <li data-id=${id}>
            ${(title ?? "제목 없음") || (title === "" && "제목 없음")}
          </li>
          `
        )}
      </ul>
        `;
  };

  this.render();
}
