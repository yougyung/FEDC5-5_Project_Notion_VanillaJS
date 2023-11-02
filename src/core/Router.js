import { ROUTE_CHANGE_EVENT } from "../constants/ROUTE_CHANGE_EVENT.js";
import { getPathData } from "../utils/getPathData.js";
import ErrorPage from "../page/ErrorPage.js";
import { initRouter } from "../utils/handleRouteEvent.js";

export default class Router {
  constructor() {
    this.routesMap = new Map(); // path를 찾으면 {component, initialState}가 나온다
    this.routes = Array.from(arguments); //arguemnts객체는 유사배열객체라서 Array화 해줘야함
    console.log(arguments);
    this.routerTarget = this.routes[0].$target;
    console.log(this.routerTarget);
    this.routes.forEach((route) =>
      this.routesMap.set(route.path, {
        $target: route.$target,
        component: route.component,
        initialState: route.initialState,
      })
    );
    this.addRouteEvent();
    this.handleRoute();
  }
  handleRoute() {
    const [path, pathData] = getPathData();
    const { $target, component, initialState } = this.routesMap.get(path) || {
      //routes.Map에 없을때 에러처리용
      $target: this.routerTarget,
      component: ErrorPage,
      initialState: "",
    };
    if (path === "") {
      this.routerTarget.innerHTML = "";
      return;
    }
    new component({ $target, initialState });
  }
  addRouteEvent() {
    initRouter(this.handleRoute);
  }
}
