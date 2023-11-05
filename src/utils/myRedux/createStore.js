import Observer from "../globalStore/Observer.js";

export const createStore = (reducer) => {
  const state = reducer();
  return { subscribe, dispatch, getState };
};
