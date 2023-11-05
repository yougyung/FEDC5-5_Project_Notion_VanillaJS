import Observer from "../observer/Observer.js";

export const createStore = (reducer) => {
  const observer = Object.freeze(new Observer());
  const state = reducer();
  return { subscribe, dispatch, getState };
};
