import Component from "../core/Component.js";

export default class Title extends Component {
  constructor({ $target, props }) {
    super({ $target, props, tagName: "a" });
  }
  prepare() {
    this.wrapper.setAttribute("href", this.state.href);
    this.wrapper.classList.add("title");
  }
  // state = {  title,  href}
  render() {
    this.wrapper.textContent = this.state.title;
  }
  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  setEvent() {
    this.addEvent("click", ".title", (e) => e.preventDefault());
  }
}
