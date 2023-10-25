const $ = document;
export default function SideAreaPage({ $target, initialState, onClickPage, onClickButton, onClickDeleteButton }) {
  const $pageList = $.createElement("div");
  $pageList.className = "sideBarPageList";
  $target.appendChild($pageList);

  this.state = initialState;

  this.setState = (nextState) => {
    $pageList.innerHTML = "";
    this.state = nextState;
    this.render();
    addEventDocs();
  };

  const pageListRenderer = (parentTag, page) => {
    page.map(({ id, title, documents }) => {
      if (documents.length > 0) {
        const createdUl = $.createElement("ul");
        const createdLi = $.createElement("li");
        const addPageButton = $.createElement("button");
        addPageButton.innerText = "+";
        addPageButton.id = "addPageButton";

        const addDeletePageButton = $.createElement("button");
        addDeletePageButton.innerText = "X";
        addDeletePageButton.id = "addDeletePageButton";

        const inheritedParentStyle = Number(parentTag.style.paddingLeft.replace("px", ""));
        if (inheritedParentStyle) {
          createdUl.style.paddingLeft = `${inheritedParentStyle + 4}px`;
        } else {
          createdUl.style.paddingLeft = "3px";
        }

        createdLi.dataset.id = id;
        if (title.length) {
          createdLi.innerText = `> ${title}`;
        } else {
          createdLi.innerText = `>  `;
        }
        createdLi.appendChild(addPageButton);
        createdLi.appendChild(addDeletePageButton);
        createdUl.appendChild(createdLi);
        parentTag.appendChild(createdUl);
        pageListRenderer(createdUl, documents);
      } else {
        const createdUl = $.createElement("ul");
        const createdLi = $.createElement("li");
        const addPageButton = $.createElement("button");
        addPageButton.innerText = "+";
        addPageButton.id = "addPageButton";

        const addDeletePageButton = $.createElement("button");
        addDeletePageButton.innerText = "X";
        addDeletePageButton.id = "addDeletePageButton";

        createdLi.dataset.id = id;
        if (title.length) {
          createdLi.innerText = `> ${title}`;
        } else {
          createdLi.innerText = `>  `;
        }
        const inheritedParentStyle = Number(parentTag.style.paddingLeft.replace("px", ""));
        if (inheritedParentStyle) {
          createdUl.style.paddingLeft = `${inheritedParentStyle + 4}px`;
        } else {
          createdUl.style.paddingLeft = "3px";
        }
        createdLi.appendChild(addPageButton);
        createdLi.appendChild(addDeletePageButton);
        createdUl.appendChild(createdLi);
        parentTag.appendChild(createdUl);
      }
    });
  };

  this.render = () => {
    pageListRenderer($pageList, this.state);
  };

  this.render();

  const addEventDocs = () => {
    $pageList.querySelectorAll("li").forEach(($li) => {
      $li.addEventListener("click", (e) => {
        const targetTag = e.target;
        if (targetTag.tagName === "LI") {
          history.pushState(null, null, `/documents/${targetTag.dataset.id}`);
          onClickPage(targetTag.dataset.id);
        }

        if (targetTag.id === "addPageButton") {
          onClickButton(targetTag.parentElement.dataset.id);
        }

        if (targetTag.id === "addDeletePageButton") {
          onClickDeleteButton(targetTag.parentElement.dataset.id);
        }
      });
    });
  };
}
