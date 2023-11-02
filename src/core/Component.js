import { validateState } from "../utils/validateState.js";

export default class Component {
  state;
  constructor({ $target, tagName }) {
    this.$target = $target;
    this.wrapper = tagName ? document.createElement(tagName) : null;
    this.$target.appendChild(this.wrapper);
    this.createTemplate();
    this.setEvent();
  }
  render() {
    const content = this.createTemplate();
    this.wrapper.innerHTML = content;
    this.renderChild();
  }
  createTemplate() {
    return "";
  }
  setEvent() {
    this.addEvent();
  }
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
  }
}
