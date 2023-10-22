import NavPage from "./page/NavPage.js";
import DocumentPage from "./page/DocumentPage.js";
import { initRouter } from "./utils/router.js";
import ErrorPage from "./page/ErrorPage.js";

export default function App({ $target }) {
  const $app = document.getElementById("app");
  //이친구는 항상 렌더된다.
  new NavPage({
    $target,
  });
  const documentPageProps = {
    $target: $app,
    initialState: {
      documentId: null,
      document: [],
    },
  };
  const routes = [{ path: "documents", component: DocumentPage }];
  this.render = async (url) => {
    const path = url ?? window.location.pathname;
    const [, pathname, pathData] = path.split("/");
    if (pathname === "") return; //메인이면 그냥 리턴
    const component =
      routes.find((route) => route.path === pathname)?.component ||
      new ErrorPage({ $target: $app });
    //라우팅 되는 자식들은 replaceChildren으로 사용해서 깜빡임 방지..
    new component({
      ...documentPageProps,
      initialState: { id: pathData },
    });
  };

  initRouter(this.render);
}
