import { DUMMY_DATA_SIDE_LIST } from "../utils/api.js";

const $ = document;
export default function SideAreaPage({ $target, initialState, onClick }) {
  //   console.log($target);
  // console.log(DUMMY_DATA_SIDE_LIST);
  const $pageList = $.createElement("div");
  $pageList.className = "sideBarPageList";
  $target.appendChild($pageList);

  this.state = initialState;
  // console.log(this.state);

  this.setState = (nextState) => {
    $pageList.innerHTML = ""; // 이걸 안해주면 중첩해서 쌓임
    this.state = nextState;
    // console.log(this.state);
    this.render();
    addEventDocs();
  };

  // 무조건 재귀 생긴다 -> 함수로 빼줘야함
  // 또한 추후에 state를 받아서 실행시키는 형식이 되어야 함
  // id, title이 공통이니 두개만 옮기고 나머지는 api 호출로..?
  const pageListRenderer = (parentTag, page) => {
    page.map(({ id, title, documents }) => {
      // console.log(;
      // console.log(documents.length);
      if (documents.length > 0) {
        const createdUl = $.createElement("ul");
        const createdLi = $.createElement("li");
        const inheritedParentStyle = Number(parentTag.style.paddingLeft.replace("px", ""));
        // console.log(inheritedParentStyle);
        if (inheritedParentStyle) {
          createdUl.style.paddingLeft = `${inheritedParentStyle + 10}px`;
        } else {
          createdUl.style.paddingLeft = "3px";
        }

        createdLi.dataset.id = id;
        createdLi.innerText = title;
        // console.log(title);
        // console.log(documents);
        parentTag.appendChild(createdUl);
        createdUl.appendChild(createdLi);
        pageListRenderer(createdUl, documents);
      } else {
        const createdUl = $.createElement("ul");
        const createdLi = $.createElement("li");
        createdLi.dataset.id = id;
        createdLi.innerText = title;
        const inheritedParentStyle = Number(parentTag.style.paddingLeft.replace("px", ""));
        // console.log(inheritedParentStyle);
        if (inheritedParentStyle) {
          createdUl.style.paddingLeft = `${inheritedParentStyle + 4}px`;
        } else {
          createdUl.style.paddingLeft = "3px";
        }
        createdUl.appendChild(createdLi);
        parentTag.appendChild(createdUl);
      }
    });
  };

  this.render = () => {
    // state 전체를 넣는게 맞을까?
    pageListRenderer($pageList, this.state);
  };

  this.render();
  const addEventDocs = () => {
    $pageList.querySelectorAll("li").forEach(($li) => {
      $li.addEventListener("click", (e) => {
        // console.log(e.target.href);
        // console.log(e);
        // console.log(e.target.dataset.id);
        // 요 방식은 리로딩이 일어납니다. !SPA
        // e.preventDefault();
        // location.pathname = `/documents/${e.target.dataset.id}`;
        history.pushState(null, null, `/documents/${e.target.dataset.id}`);
        onClick(e.target.dataset.id);
        // console.log(`${$li}, 안녕 나는 li야, `);
      });
    });
  };
}
