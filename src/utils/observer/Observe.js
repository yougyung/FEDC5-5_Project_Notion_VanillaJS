import { isEqual } from "../isEqual.js";

let currentObserver = null;
const observers = {};

export const observe = (fn) => (currentObserver = fn);
export const observable = (obj) => {
  //상태마다 돌면서 get,set 지정
  const stateKeys = Object.keys(obj);
  stateKeys.forEach((key) => {
    let _value = obj[key];
    if (observers[key] === undefined) {
      observers[key] = new Set();
    }
    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver) {
          observers[key].add(currentObserver);
          currentObserver = null;
        }
        return _value;
      },
      set(value) {
        if (isEqual(_value, value)) {
          return;
        }
        _value = value;
        observers[key].forEach((fn) => fn());
      },
    });
  });
  return obj;
};
