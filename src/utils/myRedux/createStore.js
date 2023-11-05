import Observable from "../observer/Observable.js";

export const createStore = (reducer) => {
  const observable = Object.freeze(new Observable());
  const state = reducer();
  observable(state);
  const subscribe = (callback) => observable.subscribe(callback);
  const dispatch = (action) => reducer(state, action);
  const getState = () => Object.freeze(state);
  return { subscribe, dispatch, getState };
};
