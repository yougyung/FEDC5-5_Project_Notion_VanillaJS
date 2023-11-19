import getDeepCopy from "../utils/getDeepCopy.js";

export default class Observable {
  #observers = new Set();
  constructor(state) {
    this.state = getDeepCopy(state);
  }
  subscribe(observerCallback) {
    this.#observers.add(observerCallback);
  }
  unsubscribe(observerCallback) {
    this.#observers.delete(observerCallback);
  }
  notify() {
    this.#observers.forEach((callback) => callback());
  }
  changedState(nextState) {
    this.state = { ...getDeepCopy(this.state), ...getDeepCopy(nextState) };
    this.notify();
  }
}
