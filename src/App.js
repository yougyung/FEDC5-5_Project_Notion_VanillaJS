import EditorApp from "./Editor/App.js";
import MenuBarApp from "./MenuBar/App.js";
import { request } from "./Util/Api.js";
export default function App({ $target, initialState }) {
  // 편집기 컴포넌트
  new EditorApp({
    $target,
    initialState,
  });

  // 메뉴 바 컴포넌트
  new MenuBarApp({
    $target,
    initialState,
  });
}
