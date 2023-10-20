export default function DocumentTree({ $target, initialState = [] }) {
  const $tree = document.createElement("div");
  $tree.className = "document-tree";
  $target.appendChild($tree);

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
    $tree.appendChild($ul);

    $ul.addEventListener("click", (e) => {
      const $span = e.target.closest("span");

      if (!$span || e.target.className !== "add-button") return;

      const { id } = $span.dataset;
      console.log(id, $span);
      history.pushState(null, null, `/document/${id}`);
    });
  };
}
