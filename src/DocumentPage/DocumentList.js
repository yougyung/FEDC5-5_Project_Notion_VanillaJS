import { push } from "../router.js";

export default function DocumentList({
  $target,
  initialState,
  onDelete,
  onPost,
}) {
  const $documentList = document.createElement("div");
  $target.appendChild($documentList);

  this.state = initialState;

  // nextState로 변경 후 상태에 따라 그리기
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.createMenuTree = (documents) => {
    return documents
      .map((doc) => {
        return `<li data-id=${doc.id} class="document-item">
          <div class="document-item-container">
            <div class="item_content">
              <img class="document-icon" src="/src/assets/img/doc.png"/>${
                doc.title
              }
            </div>
            <div class="item_buttons">
            <img class="add-btn" src="/src/assets/img/add2.png"/>
              <img class="delete-btn" src="/src/assets/img/delete.png"/>
            </div>
          </div>
          ${
            doc.documents
              ? `<ul style="margin-left:14px">${this.createMenuTree(
                  doc.documents
                )}</ul>`
              : ""
          }
        </li>`;
      })
      .join("");
  };

  this.render = () => {
    $documentList.innerHTML = `
    <ul>
      <li data-id="new" class="document-item-container">새로운 문서 추가하기 +</li>
      ${this.createMenuTree(this.state)}
      </ul>`;
  };

  // 문서 리스트 클릭 시 /documents/${id}로 url 바꿈
  $documentList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");

    if ($li) {
      const { id } = $li.dataset;

      // delete 버튼 클릭 시
      if (e.target.classList.contains("delete-btn")) {
        onDelete(id);
        return;
      }

      // add 버튼 클릭 시
      if (e.target.classList.contains("add-btn")) {
        onPost(id);
        return;

        // 로컬스토리지에 id 저장.
      }
      // onClick();
      push(`/documents/${id}`); // 이벤트 dispatch
    }
  });
}
