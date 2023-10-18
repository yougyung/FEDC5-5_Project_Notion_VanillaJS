import SideAreaRender from "./sidearea/sideAreaRender.js";
import TextAreaRender from "./textarea/textAreaRender.js";
import { DUMMY_DATA_SIDE_LIST, DUMMY_DATA_TEXT_CONTENT } from "./utils/api.js";
import { request } from "./utils/api.js";

const $ = document;
export default function App({ $target }) {
  const $sideBarWrapperDiv = $.createElement("div");
  const $textAreaWrapperDiv = $.createElement("div");
  $sideBarWrapperDiv.className = "sideBarWrapper";
  $textAreaWrapperDiv.className = "textAreaWrapper";

  this.state = [
    {
      id: 0,
      title: "",
      documents: [],
      createdAt: "",
      updatedAt: "",
    },
  ];

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  //   console.log(this.state);

  $target.appendChild($sideBarWrapperDiv);
  $target.appendChild($textAreaWrapperDiv);

  const sideAreaRender = new SideAreaRender({ $target: $sideBarWrapperDiv, initialState: this.state });
  // 더미가 렌더링 되었다가 api 호출되면 바뀐다.
  const textAreaRender = new TextAreaRender({ $target: $textAreaWrapperDiv, initialState: DUMMY_DATA_TEXT_CONTENT });

  const fetchRootDocs = async () => {
    const rootDocsRespond = await request("/documents");
    // console.log(rootDocsRespond);
    sideAreaRender.setState(rootDocsRespond);
  };

  this.render = async () => {};

  const init = async () => {
    await fetchRootDocs();
    // console.log(this.state);
  };

  init();
}
