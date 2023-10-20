import { push } from "../utils/router.js";

export default function DocumentItem({
  $target,
  initialState,
  createDocument,
  deleteDocument,
  depth,
}) {
  this.state = initialState;
  const $documentItem = document.createElement("div");
  $documentItem.dataset.id = this.state.id;
  $documentItem.className = "document-item";
  $documentItem.style.paddingLeft = `${depth * 20}px`;
  $target.appendChild($documentItem);
  this.render = () => {
    $documentItem.innerHTML = `
        <button data-name="more">▽</button>
        <a href="/documents/${this.state?.id}">${this.state?.title}</a>
        <button data-name="delete-doc">-</button>
        <button data-name="create-doc">+</button>
      `;
  };
  $documentItem.addEventListener("click", (e) => {
    //버튼 누를시 버튼의 부모(li) id의 하위 문서 생성..
    const { name } = e.target.dataset;
    const { id } = e.target.parentNode.dataset;
    if (name === "more") {
      const { nextSibling } = e.currentTarget;
      if (nextSibling) {
        nextSibling.classList.toggle("display-none");
      }
    } else if (name === "create-doc") {
      createDocument(id);
    } else if (name === "delete-doc") {
      deleteDocument(id);
    }
    if (e.target.tagName === "A") {
      e.preventDefault();
      push(`/documents/${id}`);
    }
  });
  this.render();
}
