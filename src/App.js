export default class App {
  constructor({ $target }) {
    this.$target = $target;

    this.render();
  }

  render() {
    this.$target.innerHTML = '<div>안녕하세요. App입니다.</div>';
  }
}
