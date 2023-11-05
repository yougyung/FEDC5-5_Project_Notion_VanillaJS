export default class Observer {
  constructor() {
    this.subscribers = new Set();
  }
  subscribe(observerCallback) {
    this.subscribers.add(observerCallback);
  }
  unsubscribe(observerCallback) {
    this.subscribers.delete(observerCallback);
  }
  notify(data) {
    this.subscribers.forEach((subscriber) => subscriber(data));
  }
}
