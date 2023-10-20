import TreeList from "./TreeList.js";

export default function DocumentTree({
  $container,
  initialState = [],
  onAddClick,
}) {
  const $tree = document.createElement("div");
  $tree.id = "document-tree";
  $container.appendChild($tree);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.makeDocumentTree = (children, element) => {
    for (const child of children) {
      const $li = document.createElement("li");
      new TreeList({ $container: $li, child });

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
    new TreeList({ $container: $ul });
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
