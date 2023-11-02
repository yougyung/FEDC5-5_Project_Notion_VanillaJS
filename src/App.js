import DocumentPage from "./page/DocumentPage.js";
import { initRouter } from "./utils/router.js";
import ErrorPage from "./page/ErrorPage.js";
import Nav from "./component/Nav.js";
import Component from "./core/Component.js";

export default class App extends Component({ $target }) {
  $app = document.getElementById("app");
  routes = new Map();
  constructor($target, tagName){
    super($target, tagName)
  }
  //NavPage는 항상 렌더되야한다
  renderChild() {
    new Nav({
      $target: $app,
    });
  }
  addRoutes() {
    routes.set("documents", DocumentPage);
    initRouter(this.render);
  }
  render(url) {
    const path = url ?? window.location.pathname;
    const [, pathname, pathData] = path.split("/");
    if (pathname === "") {
      //메인이면 메인 비워주기
      $app.innerHTML = "";
      return;
    }
    const component = routes.get(pathname) || ErrorPage;
    //라우팅 되는 직계 자식들은 replaceChildren으로 깜빡임 방지..
    new component({
      $target: $app,
      initialState: { id: pathData },
    });
  }
  addRoutes()
}
