import NavPage from "./page/NavPage.js";
import DocumentPage from "./page/DocumentPage.js";
import { initRouter } from "./utils/router.js";
import ErrorPage from "./page/ErrorPage.js";

export default function App({ $target }) {
  const $app = document.getElementById("app");
  //NavPage는 항상 렌더되야한다
  new NavPage({
    $target,
  });
  const routes1 = new Map();
  const routes = [{ path: "documents", component: DocumentPage }];
  this.render = async (url) => {
    const path = url ?? window.location.pathname;
    const [, pathname, pathData] = path.split("/");
    if (pathname === "") {
      //메인이면 메인 비워주기
      $app.innerHTML = "";
    } else if (pathname === "documents") {
      //라우팅 되는 직계 자식들은 replaceChildren으로 깜빡임 방지..
      const component = routes.find(
        (route) => route.path === "documents"
      ).component;
      new component({
        $target: $app,
        initialState: { id: pathData },
      });
    } else new ErrorPage({ $target: $app });
  };
  initRouter(this.render);
}
