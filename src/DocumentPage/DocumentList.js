export default function DocumentList({ $target, initialState }) {
  const $documentlist = document.createElement("div");
  $target.appendChild($documentlist);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $documentlist.innerHTML = `
    <ul>
      ${this.state
        .map(({ id, title }) => {
          return `<li data-id=${id} class="document-item">${title}</li>`;
        })
        .join("")}
      </ul>`;
  };
}
