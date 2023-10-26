export default function EditDocument({ $target, initialState }) {
  const $editContainer = document.createElement("div");
  $editContainer.className = "edit-container";
  $target.appendChild($editContainer);

  this.state = initialState;

  const setState = (nextState) => {
    this.state = nextState;
    render();
  };

  const render = () => {
    $editContainer.innerHTML = `
              <div class="editable" id="editable-title" contenteditable="true">
                <h1>제목없음</h1>
              </div>
              <div class="editable" id="editable-content" contenteditable="true">
                <p>Type your content here...</p>
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
