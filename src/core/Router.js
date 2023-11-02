import { getPathData } from "../utils/getPathData.js";
import ErrorPage from "../page/ErrorPage.js";
import { initRouter } from "../utils/handleRouteEvent.js";

export default class Router {
  constructor({ $target }, ...routes) {
    this.routesMap = new Map(); // path를 찾으면 {component, initialState, target}가 나온다
    this.routes = routes;
    this.$target = $target;
    this.addRoutesInMap();
    this.addRouteEvent();
  }
  addRoutesInMap() {
    this.routes.forEach((route) =>
      this.routesMap.set(route.path, {
        component: route.component,
        initialState: route.initialState,
      })
    );
    console.log(this.routesMap.get("documents"));
  }
  handleRoute() {
    const [path, pathData] = getPathData();
    const { component, initialState } = this.routesMap.get(path) || {
      //routes.Map에 없을때 에러처리용
      component: ErrorPage,
      initialState: "",
    };
    if (path === "") {
      this.$target.innerHTML = "";
      return;
    }
    new component({ $target: this.$target, initialState });
  }
  addRouteEvent() {
    initRouter(() => this.handleRoute());
  }
}
