export default function SideMenu({
  $target,
  initialState,
  onSelect,
  onPlusClick,
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

  $nav.addEventListener("click", async (e) => {
    const $button = e.target.closest("button[data-button]");
    if ($button) {
      const { button } = $button.dataset;
      const $ul = $button.parentNode.nextSibling;

      $ul.innerHTML += `<li>제목없음</li>`;
      onPlusClick(button);
    }
  });
}

const buildTree = (arr, depth) => {
  if (arr.length) {
    return `<ul data-depth=${depth}>${arr
      .map(
        ({ id, title, documents }) =>
          `<li ><span data-id="${id}">${title}</span><button data-button="${id}"> + </button>
          </li>${buildTree(documents, depth + 1)}`
      )
      .join("")}</ul>`;
  } else return `<ul data-depth=${depth}></ul>`;
};
