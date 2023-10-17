import { DUMMY_DATA_SIDE_LIST } from "../utils/api.js";

const $ = document;
export default function SideAreaPage({ $target, initialState }) {
  //   console.log($target);
  // console.log(DUMMY_DATA_SIDE_LIST);
  const $pageList = $.createElement("div");
  $target.appendChild($pageList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  // 무조건 재귀 생긴다 -> 함수로 빼줘야함
  // 또한 추후에 state를 받아서 실행시키는 형식이 되어야 함
  // id, title이 공통이니 두개만 옮기고 나머지는 api 호출로..?
  const pageListRenderer = (parentTag, page) => {
    page.map((value) => {
      console.log(value);
      console.log(value.documents.length);
      if (value.documents.length > 0) {
        const createdUl = $.createElement("ul");
        const createdLi = $.createElement("li");

        createdLi.innerText = value.title;
        console.log(value.title);
        console.log(value.documents);
        parentTag.appendChild(createdUl);
        createdUl.appendChild(createdLi);
        pageListRenderer(createdUl, value.documents);
      } else {
        const createdUl = $.createElement("ul");
        const createdLi = $.createElement("li");
        createdLi.innerText = value.title;
        createdUl.appendChild(createdLi);
        parentTag.appendChild(createdUl);
      }
    });
  };

  this.render = () => {
    pageListRenderer($pageList, DUMMY_DATA_SIDE_LIST);
  };
  this.render();
}
