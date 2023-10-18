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
  $target.appendChild($documentItem);
  $documentItem.dataset.id = this.state.id;
  $documentItem.style.display = "flex";
  $documentItem.style.marginTop = "5px";
  $documentItem.className = "document-item";
  $documentItem.style.paddingLeft = `${depth * 20}px`;

  this.render = () => {
    $documentItem.innerHTML = `
        <button data-name="more">▽</button>
        <span>${this.state?.title}</span>
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
    if (e.target.tagName === "SPAN") {
      console.log(e.target);
      push(`/documents/${id}`);
    }
  });
  this.render();
}
