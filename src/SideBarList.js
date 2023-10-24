import { DeletPageButton, pageAddDeleteButton } from "./PageButton.js";
import { pushRoute } from "./utils/router.js";

export default function SideBarList({
  $target,
  initialState,
  handleChangeList,
}) {
  const $sideBarList = document.createElement("div");
  $sideBarList.className = "side_bar_list";
  $target.appendChild($sideBarList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
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
      $subLi.innerHTML = `<div class="each"><img class="toggle_button" src="../assets/right.png"></img><div class="list_title_wrap"><div class="list_title">${doc.title}</div></div></div>`;

      new pageAddDeleteButton({
        $target: $subLi.firstChild, // 말고 div.list_title 안에 넣어서 div를 relative, 버튼두개를 fixed로 두고 호버할때만 보이게/ 호버했을때는  글자나올 부분 크기를 div길이 -버튼두개길이 로 두고 그거 넘어가면 ... 호버 안했을 땐 div 전체길이
        id: doc.id,
        handleChangeList,
      });
      // new DeletPageButton({
      //   $target: $subLi.firstChild,
      //   id: doc.id,
      //   handleChangeList,
      // });
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
      e.target.innerHTML =
        e.target.innerHTML ===
        `<img src="../assets/down.png" style="width:12px; height:12px"></img>`
          ? `<img src="../assets/right.png" style="width:12px; height:12px"></img>`
          : `<img src="../assets/down.png" style="width:12px; height:12px"></img>`;
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
