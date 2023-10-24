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

  // 최초 실행 및 새로고침 시 동작 -> 현재 pathname에 맞는 라우팅
  const render = async () => {
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

  // 변경된 pathname을 라우팅 -> 윈도우 이벤트 핸들러에 의해 동작
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

      editorApp.setState(post);
    }
  };

  // document 리스트 get 요청
  const fetchData = async (url, payload = {}) => {
    const postList = await HTTPRequest(url, payload);

    return postList;
  };

  // 새로 고침 & 최초 실행시 라우팅
  render();

  // window의 이벤트 대기
  getCustomEvent(route);

  // 뒤로가기 라우팅
  popState(route);
}
