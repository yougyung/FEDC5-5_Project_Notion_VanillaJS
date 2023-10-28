export default function EditDocument({ $target, initialState }) {
  const $editContainer = document.createElement("div");
  $editContainer.className = "edit-container";
  $target.appendChild($editContainer);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    render();
  };

  const render = () => {
    const { title, content } = this.state.selectedDocument;

    $editContainer.innerHTML = `
      <div class="editable" id="editable-title" contenteditable="true">
        <h1>${title || "제목 없음"}</h1>
      </div>
      <div class="editable" id="editable-content" contenteditable="true">
        <p>${content || "내용을 입력하세요."}</p>
      </div>
    `;
  };

  $editContainer.addEventListener("click", async (e) => {
    const $node = e.target;

    if ($node.matches(".side-bar-document")) {
      const documentId = $node.dataset.id;
      const documentContent = await getDocumentContent(documentId);
    }
  });

  render();
}
