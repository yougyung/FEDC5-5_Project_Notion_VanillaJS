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
    console.log(this.state[0].id);
    this.render();
  };

  $target.appendChild($sideBarWrapperDiv);
  $target.appendChild($textAreaWrapperDiv);

  const sideAreaRender = new SideAreaRender({ $target: $sideBarWrapperDiv, initialState: this.state });
  // 더미가 렌더링 되었다가 api 호출되면 바뀐다.

  // 텍스트 편집기에 initialState는 그냥 파라미터 안에서 빈값 주면 된다.
  const textAreaRender = new TextAreaRender({
    $target: $textAreaWrapperDiv,
    initialState: [
      {
        title: "",
        content: "",
      },
    ],
  });

  const fetchRootDocs = async () => {
    const rootDocsRespond = await request(`/documents`);
    // console.log(rootDocsRespond);
    this.setState(rootDocsRespond);
    sideAreaRender.setState(rootDocsRespond);
    // console.log(`됌?`);
    await fetchSelectedDocs();
  };

  const fetchSelectedDocs = async () => {
    // 흠...그러면 처음 루트페이지 불러오고 그다음에 얘를 실행해야하는게 순서상 맞다. 안그러면 오류 날 것 같은디?
    // 처음 있는 값을 일단 루트로 둔다. 하지만 이 부분은 localStorage 기능을 이용해서 추후에 이전에 열고 있던 페이지를 루트로 보여주면 좋을 것 같다.
    // 뭔가 멋이 없어...간지가 나지 않아..
    const nowDocsId = this.state[0].id;
    if (nowDocsId) {
      //방어코드
      const selectedDocs = await request(`/documents/${nowDocsId}`);
      textAreaRender.setState(selectedDocs);
    }
  };

  this.render = async () => {};

  const init = async () => {
    await fetchRootDocs();
    // console.log(this.state);
  };

  init();
}
