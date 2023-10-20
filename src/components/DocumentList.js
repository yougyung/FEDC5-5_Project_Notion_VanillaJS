export default function DocumentList({
  $target,
  initialState,
  onDocumentItemClick,
}) {
  const $document = document.createElement("div");
  $document.setAttribute("class", "documents-container");

  $target.appendChild($document);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const documentPrint = (documents) => {
    let htmlString = "";
    documents.forEach((document) => {
      htmlString += `
        <div class="documents-item" data-id="${document.id}">
            <div class="document-item-title-wrap">
                <button class="toggle">></button>
                <span>${document.title}</span>
            </div>
            <div class="documents-item fold">
                ${
                  document.documents && document.documents.length !== 0
                    ? documentPrint(document.documents)
                    : '<span class="end-document-item">하위 페이지 없음</span>'
                }
            </div>
        </div>
    `;
    });

    return htmlString;
  };

  this.render = () => {
    if (this.state.length === 0) {
      $document.innerHTML += "";
      return;
    }

    $document.innerHTML += `
            ${documentPrint(this.state)}
        `;
  };

  this.render();

  $document.addEventListener("click", (e) => {
    const $documentItem = e.target.closest(".documents-item");

    if ($documentItem) {
      const $child = $documentItem.children[1];
      const { id } = $documentItem.dataset;

      if ($child) {
        if (e.target.className === "toggle") {
          const isFolded = $child.classList.contains("fold");

          if (isFolded) {
            $child.classList.remove("fold");
            $child.classList.add("show");
          } else {
            $child.classList.remove("show");
            $child.classList.add("fold");
          }
        } else {
          onDocumentItemClick(id);
        }
      }
    }
  });
}
