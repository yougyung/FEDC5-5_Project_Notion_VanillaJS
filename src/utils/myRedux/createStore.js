import Observer from "../observer/Observable.js";

export const createStore = (reducer) => {
  const observer = Object.freeze(new Observer());
  const state = reducer();
  const subscribe = () => {
    observer.subscribe();
  };
  return { subscribe, dispatch, getState };
};
