import HomePage from "./pages/HomePage.js";
import { initRouter } from "./utils/router.js";
import { DUMMY_DATA } from "./mock.js";
import Sidebar from "./components/Sidebar.js";

export default function App({ $target }) {
  const sidebar = new Sidebar({ $target, initialState: DUMMY_DATA });

  /** SPA 라우팅 */
  this.route = () => {
    console.log("화면 이동 감지");

    // $target.innerHTML = ""; // 화면 비우기
    const { pathname } = window.location;

    // path 위치에 따른 컴포넌트 렌더링
    if (pathname === "/") {
      console.log("/");
      sidebar.setState();
    } else if (pathname.indexOf("/posts/") === 0) {
      //const [, , postId] = pathname.split("/");
      //postEditPage.setState({ postId });
    }
  };

  this.route();
  initRouter(() => this.route());
}
