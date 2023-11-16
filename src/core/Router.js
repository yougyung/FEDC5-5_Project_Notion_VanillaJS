import { getPathData } from "../utils/getPathData.js";
import ErrorPage from "../page/ErrorPage.js";
import { initRouter } from "../utils/handleRouteEvent.js";

export default class Router {
  constructor({ $target }, ...routes) {
    //appendChild로 붙일 부모노드(target)와 라우트기능이 필요한 컴포넌트들을 받아옴.
    this.fragment = new DocumentFragment();
    this.routesMap = new Map();
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
  }
  handleRoute() {
    const [path, pathData] = getPathData();
    const { component, initialState } = this.routesMap.get(path) || {
      //routes.Map에 없을때 에러처리용
      component: ErrorPage,
      initialState: "",
    };
    this.fragment.innerHTML = "";
    this.$target.appendChild(this.fragment);
    new component({ $target: this.fragment, initialState });
  }
  addRouteEvent() {
    initRouter(() => this.handleRoute());
  }
}
