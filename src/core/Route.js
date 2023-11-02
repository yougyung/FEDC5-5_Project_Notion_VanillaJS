export default class Route {
  constructor($target, path, component, initialState) {
    this.path = path;
    this.$target = $target;
    this.initialState = initialState;
    this.component = component;
  }
}
