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

/*
전역객체로 나중에 사용할 예정
const globalStore = {
  data: {},
  observer: new Observer(),
};

globalStore.setData = function (key, value) {
  this.data[key] = value;
  this.observer.notify({ key, value });
};
 */
