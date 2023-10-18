import EditorApp from "./Editor/App.js";
import MenuBarApp from "./MenuBar/App.js";
import { HTTPRequest } from "./Util/Api.js";

export default function App({ $target, initialState }) {
  this.state = initialState;

  // state가 변경되면 App.js 하위 컴포넌트의 state도 변경
  this.setState = (nextState) => {
    this.state = nextState;

    menuBarApp.setState(this.state);
    editorApp.setState(this.state);
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
      const postList = await getFetchList();

      this.setState(postList);
    }
  };

  // document 리스트 get 요청
  const getFetchList = async () => {
    const postList = await HTTPRequest("");

    return postList;
  };

  route();
}
