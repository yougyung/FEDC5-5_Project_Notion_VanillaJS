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
  $documentItem.classList.add("document-item");
  $documentItem.style.paddingLeft = `${depth > 0 ? depth * 20 : 10}px`;
  $target.appendChild($documentItem);
  this.render = () => {
    $documentItem.innerHTML = `
        <button class="arrow-btn" data-name="more">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330" width="800px" height="800px">
            <g xmlns="http://www.w3.org/2000/svg" transform="matrix(0 -1 1 0 -0 330)">
              <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  
              c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  
              s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z" />
            </g>
          </svg>
        </button>
        <a href="/documents/${this.state?.id}">${this.state?.title}</a>
        <button data-name="delete-doc">-</button>
        <button data-name="create-doc">+</button>
      `;
  };
  $documentItem.addEventListener("click", (e) => {
    //버튼 누를시 버튼의 부모(li) id의 하위 문서 생성..
    if (e.target.tagName === "A") {
      e.preventDefault();
    }
    const { name } = e.target.dataset;
    const { id } = e.currentTarget.dataset;
    if (e.target.closest("[data-name=more]")) {
      console.log(e.target);
      const { nextSibling } = e.currentTarget;
      if (
        nextSibling &&
        nextSibling.classList.contains("document-item-children")
      ) {
        nextSibling.classList.toggle("display-none");
        const arrowIcon = e.currentTarget.querySelector("svg");
        arrowIcon.classList.toggle("rotate-90edge");
      }
    } else if (name === "create-doc") {
      createDocument(id);
    } else if (name === "delete-doc") {
      deleteDocument(id);
    } else {
      push(`/documents/${id}`);
    }
  });
  this.render();
}
