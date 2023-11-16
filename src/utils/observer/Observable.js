import getDeepCopy from "../getDeepCopy.js";

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
    this.#observers.forEach((subscriber) => subscriber());
  }
  changedState(nextState) {
    this.state = { ...getDeepCopy(this.state), ...getDeepCopy(nextState) };
    this.notify();
  }
}
