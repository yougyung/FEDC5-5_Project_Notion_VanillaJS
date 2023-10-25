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

const globalStore = {
  data: {},
  observer: new Observer(),
};

globalStore.setData = function (key, value) {
  this.data[key] = value;
  this.observer.notify({ key, value });
};

/* let currentObserver = null;
export const observe = (func) => {
  currentObserver = func;
  func();
  currentObserver = null;
};

export const observable = (obj) => {
  Object.keys(obj).forEach((key) => {
    let _value = obj[key];
    const observers = new Set();
    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },
      set(value) {
        _value = value;
        observers.forEach((func) => func());
      },
    });
  });
  return obj;
};

 */
