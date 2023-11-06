import getDeepCopy from "../getDeepCopy.js";
import Observable from "../observer/Observable.js";

export const createStore = (reducer) => {
  const state = reducer(undefined, undefined);
  const observable = Object.freeze(new Observable(state));
  const subscribe = (callback) => observable.subscribe(callback);
  const dispatch = (action) => {
    const nextState = reducer(state, action());
    for (const key in nextState) {
      state[key] = getDeepCopy(nextState[key]);
    }
  };
  const getState = () => Object.freeze(state);
  return { subscribe, dispatch, getState };
};
