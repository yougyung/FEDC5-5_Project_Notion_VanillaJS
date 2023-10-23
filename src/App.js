import EditorApp from "./Editor/App.js";
import MenuBarApp from "./MenuBar/App.js";
import { HTTPRequest } from "./Util/Api.js";
import { getCustomEvent, popState } from "./Util/Router.js";

export default function App({ $target, initialState }) {
  this.state = initialState;

  // state가 변경되면 App.js 하위 컴포넌트의 state도 변경
  this.setState = (nextState) => {
    this.state = nextState;
  };
  // 메뉴 바 컴포넌트
  const menuBarApp = new MenuBarApp({
    $target,
    initialState,
  });

  // 편집기 컴포넌트
  const editorApp = new EditorApp({
    $target,
    initialState,
  });

  // 라우팅 함수 -> 현재 pathname에 맞는 라우팅
  const route = async () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      const postList = await fetchData("");
      console.log("초기 데이터", postList);
      menuBarApp.setState(postList);
    } else {
      // 해당 id를 가진 문서를 에디터 App의 state에 전송
      const [_, id] = pathname.split("/");
      const [post, postList] = await Promise.all([
        fetchData(`/${id}`),
        fetchData(""),
      ]);

      menuBarApp.setState(postList);
      editorApp.setState(post);
    }
  };

  // document 리스트 get 요청
  const fetchData = async (url, payload = {}) => {
    const postList = await HTTPRequest(url, payload);

    return postList;
  };

  route();

  // window의 이벤트 대기
  getCustomEvent(route);

  // 뒤로가기 라우팅
  popState(route);

  // 임시로 서버에 데이터 넣기 위한 로직
  // const dummy = {
  //   title: "타입스크립트의 변수",
  //   content: "타입스크립트의 변수는 자바스크립트와 유사합니다.",
  // };
  // const data = HTTPRequest("");

  // console.log(data);
}
