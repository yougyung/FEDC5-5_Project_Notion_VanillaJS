import App from "./App.js";
import documentsReducer from "./modules/documentsDuck.js";
import { createStore } from "./utils/myRedux/createStore.js";
import Observer from "./utils/observer/Observable.js";
const observer = Object.freeze(new Observer());
const store = createStore(documentsReducer);
export { store, observer };
const $root = document.getElementById("root");
new App({ $target: $root });
