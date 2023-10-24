import { request } from "../../../utils.js";

export default function DocumentLinkList({ $target, initialState, onClose }) {
  const $documentLinkList = document.createElement("ul");
  $documentLinkList.className = "document-link-list";

  $target.appendChild($documentLinkList);

  this.state = initialState;

  this.componentDidMount = async () => {
    const documents = await request("");
    const documentLinks = documents.map(({ id, title, documents }) => ({
      id,
      title,
      documents: documents.map(({ id, title, documents }) => ({
        id,
        title,
        documents: documents.map(({ id }) => ({ parentId: id })),
      })),
    }));
    this.setState({ documentLinks });
  };

  this.componentDidMount();

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    console.log(this.state);
    $documentLinkList.innerHTML = ` 
    <p class="modal-title">페이지를 선택하세요</p>
      <ul class="modal-list">
      ${this.state.documentLinks
        .map(
          ({ id, title, documents }) => `
          ${
            title !== ""
              ? `
          <li data-id=${id} id="link" class="wrapper">
          <i class="fa-regular fa-file"></i>
            <span class="link-title">${title}</span>
          </li>
          `
              : ""
          }
      `
        )
        .join("")}
      </ul>`;
  };

  $documentLinkList.addEventListener("click", (event) => {});

  this.render();
}