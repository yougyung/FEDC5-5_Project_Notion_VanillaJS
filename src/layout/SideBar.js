import { getAllDocumentLists, createDocument } from "../api/document.js";

export default function SideBar({ $target, initialState }) {
  const $sideContainer = document.createElement("div");
  $sideContainer.className = "side-container";
  $target.appendChild($sideContainer);

  this.state = {
    document: initialState,
    isToggle: false,
  };

  const setState = (nextState) => {
    this.state = nextState;
    render();
  };

  const initDocument = async () => {
    const documentLists = await getAllDocumentLists();
    setState({ ...this.state, documents: documentLists });
  };

  const renderDocumentLists = (documents) => {
    if (!documents) return "";

    return documents
      .map(({ id, title, documents: childDocuments }) => {
        let childDocumentsHTML = "";
        if (childDocuments && childDocuments.length > 0) {
          childDocumentsHTML = `
              <div class="side-bar-leaf-documents" style="display: none;">
                ${renderDocumentLists(childDocuments)}
              </div>
            `;
        }

        return `
            <div class="side-bar-document">
              <button class="toggle-button">></button>
              ${title}
              <button class="add-button">+</button>
              <button class="delete-button">-</button>
              ${childDocumentsHTML}
            </div>
          `;
      })
      .join("");
  };

  const render = () => {
    const documentLists = renderDocumentLists(this.state.documents);

    $sideContainer.innerHTML = `
      <div class="side-bar-container">
        <h3 class="side-bar-header-title">김윤경의 Notion</h3>
          ${documentLists}
      </div>
    `;
  };

  $sideContainer.addEventListener("click", (e) => {
    const $node = e.target;

    if ($node.matches(".toggle-button")) {
      const $leafDocuments = $node.parentNode.querySelector(
        ".side-bar-leaf-documents"
      );
      $leafDocuments.style.display =
        $leafDocuments.style.display === "none" ? "block" : "none";
    } else if ($node.matches(".add-button")) {
      // 클릭한 Document의 하위 Document로 새 Document를 생성하고 편집화면으로 넘기는 코드
    } else if ($node.matches(".delete-button")) {
      // 클릭한 Document를 삭제하는 코드
    }
  });

  initDocument();
  render();
}
