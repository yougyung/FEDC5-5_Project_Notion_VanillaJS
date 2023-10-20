export default function DocumentTree({
  $container,
  initialState = [],
  onAddClick,
}) {
  const $tree = document.createElement("div");
  $tree.className = "document-tree";
  $container.appendChild($tree);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.makeDocumentTree = (children, element) => {
    for (const child of children) {
      const $li = document.createElement("li");

      const $span = document.createElement("span");
      $span.textContent = child.title;
      $span.dataset.id = child.id;

      const $button = document.createElement("button");
      $button.textContent = "+";
      $button.className = "add-button";

      $span.appendChild($button);
      $li.appendChild($span);

      if (child.documents.length) {
        const $ul = document.createElement("ul");
        this.makeDocumentTree(child.documents, $ul);
        $li.appendChild($ul);
      }
      element.appendChild($li);
    }
  };

  this.render = () => {
    const $ul = document.createElement("ul");
    this.makeDocumentTree(this.state, $ul);

    const $span = document.createElement("span");
    const $button = document.createElement("button");
    $button.textContent = "새 문서 만들기";
    $button.className = "add-button";

    $span.appendChild($button);
    $ul.appendChild($span);
    $tree.appendChild($ul);

    $ul.addEventListener("click", (e) => {
      const $span = e.target.closest("span");
      if (!$span) return;

      const { id } = $span.dataset;
      if (e.target.className === "add-button") onAddClick(id);
      else {
        // history.pushState(null, null, `/document/${id}`);
      }
    });
  };
}
