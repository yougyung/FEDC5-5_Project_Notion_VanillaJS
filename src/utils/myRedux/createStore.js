import getDeepCopy from "../getDeepCopy.js";
import { getTag } from "../getTag.js";
import { observable } from "../observer/Observe.js";

export const createStore = (reducer, middleware) => {
  const state = {
    //state.documentsReducer
    [reducer.name]: observable(reducer(undefined, undefined)),
  };
  //subscribe는 상태 전체를 구독함.
  const subscribe = (callback) => observableAllState.subscribe(callback);

  const getState = () => Object.freeze(getDeepCopy(state));

  const dispatch = (action) => {
    if (getTag(action).includes("Function")) {
      return middleware({ dispatch, getState })(dispatch)(action);
    }
    const nextState = reducer(getDeepCopy(state[reducer.name]), action);
    const stateKeys = Object.keys(state[reducer.name]);
    stateKeys.forEach((key) => {
      state[reducer.name][key] = nextState[key];
    });
  };

  const useSelector = (selector) => {
    const selectedState = selector(state);
    /* 
      1. 컴포넌트에서 각 상태를 가져간다.
      2. 가져가는 상태를 관찰 가능하게.
        // 2-1. 상태마다 observalbe을 생성한다.
      3. dispatch로 상태가 바뀌었을때...(isEqaul을 개량한 특정 상태 변경 감지 함수로) 바뀐 상태들을 키로 가지는 observables객체를 순회하며 모두 notify
      
      - 상태를 구독할때..이름이 겹칠수 있음 => 어떤 객체의 키값인지 명시해주어야함
        => 상태의 키값들만 복제해두고 각각 observable생성해두면 된다.
    */
    return selectedState;
  };
  return { subscribe, dispatch, getState, useSelector };
};
