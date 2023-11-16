import getDeepCopy from "../getDeepCopy.js";
import { getTag } from "../getTag.js";
import Observable from "../observer/Observable.js";

export const createStore = (reducer, middleware) => {
  const state = {
    [reducer.name]: reducer(undefined, undefined),
  };
  let observable = null;
  const subscribe = (callback) => observable?.subscribe(callback);
  const getState = () => Object.freeze(state);
  /* 
    미들웨어에 들려서 어떤 값을 리턴함.
    이때 thunk의 역할이 중요하다.
    1. 함수라면, 리턴하지않고 그냥 실행한다.?
    2. 함수가 아니라면 action을 넘겨준다.
  */
  const dispatch = (action) => {
    if (getTag(action).includes("Function")) {
      return middleware({ dispatch, getState })(dispatch)(action);
    }
    const nextState = reducer(getDeepCopy(state[reducer.name]), action);
    state[reducer.name] = nextState;
    observable?.notify();
  };
  const useSelector = (func, callback) => {
    const selectedState = func(state);
    observable = Object.freeze(new Observable(selectedState));
    observable.subscribe(callback);
    return selectedState;
  };
  return { subscribe, dispatch, getState, useSelector };
};
