import getDeepCopy from "../getDeepCopy.js";

export const combineReducers = (reducers) => {
  //리듀서들은 객체에 하나씩 담겨 온다.
  const reducerKeys = Object.keys(reducers);
  //state들의 key는 리듀서 이름으로 된다.
  const combinatedReducer = (state = {}, action) => {
    const nextState = {};
    reducerKeys.forEach((reducerKey) => {
      const reducer = reducers[reducerKey];
      const prevStateForKey = state[reducerKey];
      const nextStateForKey = reducer(prevStateForKey, action);
      nextState[reducerKey] = getDeepCopy(nextStateForKey);
    });
    return nextState;
  };
  return combinatedReducer;
};
