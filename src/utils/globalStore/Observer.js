class Observer {
  constructor() {
    this.subscribers = [];
  }
  subscribe(observerCallback) {
    this.subscribers.push(observerCallback);
  }
  unsubscribe(observerCallback) {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber !== observerCallback
    );
  }
  notify(data) {
    this.subscribers.forEach((subscriber) => subscriber(data));
  }
}
export default Object.freeze(new Observer());
