export default function SideMenu({
  $target,
  initialState,
  onSelect,
  onPlusClick,
  onDeleteClick,
}) {
  const $nav = document.createElement("nav");

  $target.appendChild($nav);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $nav.innerHTML = `<h1>Documents</h1>` + buildTree(this.state, 0);
  };

  $nav.addEventListener("click", (e) => {
    const $li = e.target.closest("span[data-id]");
    if ($li) {
      const { id } = $li.dataset;
      onSelect(id);
    }
  });

  $nav.addEventListener("click", (e) => {
    const $postAddButton = e.target.closest("button[data-add]");
    if ($postAddButton) {
      const { add } = $postAddButton.dataset;
      const $ul = $postAddButton.parentNode.nextSibling;
      $ul.innerHTML += `<li>제목없음</li>`;
      onPlusClick(add);
    }
  });

  $nav.addEventListener("click", (e) => {
    const $postRemoveButton = e.target.closest("button[data-remove]");
    if ($postRemoveButton) {
      const { remove } = $postRemoveButton.dataset;
      onDeleteClick(remove);
    }
  });
}

const buildTree = (arr, depth) => {
  if (arr.length) {
    return `<ul data-depth=${depth}>${arr
      .map(
        ({ id, title, documents }) =>
          `<li ><span data-id="${id}">${title}</span><button data-add="${id}"> + </button><button data-remove="${id}"> - </button>
          </li>${buildTree(documents, depth + 1)}`
      )
      .join("")}</ul>`;
  } else return `<ul data-depth=${depth}></ul>`;
};
