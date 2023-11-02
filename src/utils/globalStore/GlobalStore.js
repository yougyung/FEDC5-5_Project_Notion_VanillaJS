import Observer from "./Observer";

/* 

*/
const globalStore = {
  state: {},
  observer: new Observer(),
};

globalStore.setState = function (key, value) {
  this.state[key] = value;
  this.observer.notify({ key, value });
};
