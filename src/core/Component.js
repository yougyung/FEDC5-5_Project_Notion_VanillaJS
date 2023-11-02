import { validateState } from "../utils/validateState.js";

export default class Component {
  state;
  constructor({ $target, tagName }) {
    this.$target = $target;
    this.wrapper = document.createElement(tagName);
    this.$target.appendChild(this.wrapper);
    this.createElement();
    this.setEvent();
  }
  render() {
    return "";
  }
  createElement() {
    const content = this.render();
    this.wrapper.innerHTML = content;
    this.renderChild();
  }
  setEvent() {}
  addEvent(eventType, selector, callback) {
    this.wrapper.addEventListener(eventType, (e) => {
      if (!e.target.closest(selector)) return false;
      callback(e);
    });
  }
  renderChild() {}
  setState(nextState) {
    const prevState = this.state;
    if (!isEqaul(prevState, nextState)) {
      this.state = validateState(this.state, nextState);
      this.render();
    }
    this.createElement();
  }
}
