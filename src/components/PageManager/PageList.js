export default function PageList({
  $target,
  initialState,
  onPageSelect,
  onSubPageAdd,
  onPageDelete,
}) {
  const $pageList = document.createElement("div");
  $pageList.className = "page_list";
  $target.appendChild($pageList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  const renderPageSubTree = (pageTree, isRoot = false) => {
    return `
      <ul >
        ${pageTree
          .map(
            (page) =>
              `
            <li data-id=${page.id} class='page_item'>
              <div class='item_seperator'>
                <button class='toggle_button'>
                ${
                  page.documents && page.documents.length
                    ? `<svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke='white'
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                    />
                    </svg>`
                    : `<svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke='white'
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>`
                } 
                  </button>
                <div class='item_title'>${page.title}</div>
                <div class='button_group'>
                  <div class='delete_button'>
                    x
                  </div>
                  <div class='add_button'>
                    +
                  </div>
                </div>
              </div>
              ${
                page.documents && page.documents.length
                  ? renderPageSubTree(page.documents)
                  : ""
              }
            </li>
          `
          )
          .join("")}</ul>
        `;
  };

  this.render = () => {
    console.log(this.state);
    $pageList.innerHTML = renderPageSubTree(this.state, true);
  };

  $pageList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const { id } = $li.dataset;
    console.log(e.target.className);
    if (id === undefined) return;
    const className = e.target.className;
    if (className === "toggle_button") {
      const $ul = $li.querySelector("ul");
      if ($ul) {
        if ($ul && $ul.style.display === "none") {
          $ul.style.display = "block";
        } else {
          $ul.style.display = "none";
        }
      }
    } else if (className === "item_title") {
      onPageSelect(id);
    } else if (className === "delete_button") {
      onPageDelete(id);
    } else if (className === "add_button") {
      const $ul = $li.querySelector("ul");
      if ($ul) {
        if ($ul && $ul.style.display === "none") {
          $ul.style.display = "block";
        } else {
          $ul.style.display = "none";
        }
      }
      onSubPageAdd(id);
    }
    console.log(id);
  });
  this.render();
}
