const DUMMY = [
  {
    id: 1, // Document id
    title: "노션을 만들자", // Document title
    documents: [
      {
        id: 2,
        title: "블라블라",
        documents: [
          {
            id: 3,
            title: "함냐함냐",
            documents: [
              {
                id: 5,
                title: "제발제발",
                documents: [],
              },
            ],
          },
        ],
      },
      {
        id: 6,
        title: "밥 묵자",
        documents: [],
      },
    ],
  },
  {
    id: 4,
    title: "hello!",
    documents: [],
  },
];

export default function DocumentTree({ $target }) {
  const $tree = document.createElement("div");
  $tree.className = "document-tree";
  $target.appendChild($tree);

  this.state = DUMMY;

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

  this.render();
}
