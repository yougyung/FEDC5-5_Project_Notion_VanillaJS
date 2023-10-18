import NewPageButton from "./NewPageButton.js";
import { pushRoute } from "./utils/router.js";
import { localStorageGetItem, localStorageSetItem } from "./utils/storage.js";
import { request } from "./utils/api.js";

export default function SideBarList({
  $target,
  initialState,
  handleAddNewPage,
}) {
  const $sideBarList = document.createElement("div");
  $sideBarList.className = "sideBarList";
  $target.appendChild($sideBarList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const handleNewPageButton = () => {
    //
  };

  const showSubLi = ({ $target, documents }) => {
    const $subUl = document.createElement("ul");
    const padding = $target.style.paddingLeft;
    $subUl.style.position = "relative";
    $subUl.style.paddingLeft = padding
      ? Number(padding.split("px")[0]) + 10 + "px"
      : "0px";
    $subUl.style.right = padding ? padding : "0px";
    $target.appendChild($subUl);
    documents.map((doc) => {
      const $subLi = document.createElement("li");
      $subLi.style.position = "relative";
      $subLi.style.paddingLeft = padding
        ? Number(padding.split("px")[0]) + 10 + "px"
        : "0px";
      $subLi.style.right = padding
        ? Number(padding.split("px")[0]) + 10 + "px"
        : "0px";
      $subLi.dataset.id = doc.id;
      $subLi.innerHTML = `<div class="each" style="position: relative;padding-left: inherit;right: inherit; width:200px">
        <button class="toggle_button">⩥</button>
        <span>${doc.title}</span>
        </div>
      `;
      new NewPageButton({
        $target: $subLi.firstChild,
        id: doc.id,
        handleAddNewPage,
      });
      $subUl.appendChild($subLi);
      if (doc.documents.length > 0) {
        const newDocuments = doc.documents;
        showSubLi({ $target: $subLi, documents: newDocuments });
      } else {
        return;
      }
    });
  };
  this.render = () => {
    const documents = this.state;
    if (documents.length > 0) {
      $sideBarList.innerHTML = "";
      // innerHTML로 그리는게 아니라 이전값이 남음. 처음 렌더링시 documents=[]일떄 그려지는 빈 ul을 막기 위함
      showSubLi({ $target: $sideBarList, documents });
    }
  };
  this.render();

  $sideBarList.addEventListener("click", (e) => {
    const { tagName, className } = e.target;
    console.log(e.target);
    if (className === "toggle_button") {
      // ⩥⊽ 여닫기
      console.log("click toggle_button");
      e.target.innerHTML = e.target.innerHTML === "⊽" ? "⩥" : "⊽";
      const li = e.target.closest("li");
      const liChilds = li.lastChild.tagName === "UL" ? li.lastChild : null;
      if (liChilds) {
        liChilds.style.display =
          liChilds.style.display !== "none" ? "none" : "block";
      }
    } else if (className === "new_button") {
      // ➕ 하위 페이지
      console.log("click new_button");
      const closestLi = e.target.closest("li");
      console.log("closestLi", closestLi.dataset.id);
    } else {
      // 그외 div.each영역 -> editPage에 그 페이지 열어줌
      const li = e.target.closest("li");
      if (li) {
        pushRoute(`/docs/${li.dataset.id}`);
      }
    }
  });
}
