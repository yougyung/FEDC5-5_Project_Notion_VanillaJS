import { getPathData } from "../utils/getPathData.js";

export default class Router {
  constructor() {
    this.routesMap = new Map(); // path를 찾으면 {component, initialState}가 나온다
    this.routes = Array.from(arguments); //arguemnts객체는 유사배열객체라서 Array화 해줘야함
    this.routes.forEach((route) =>
      this.routesMap.set(route.path, {
        $target: route.$target,
        component: route.component,
        initialState: route.initialState,
      })
    );
  }
}
