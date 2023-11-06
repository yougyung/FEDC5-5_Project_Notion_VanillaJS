import App from "./App.js";
import documentsReducer from "./modules/document.js";
import Observer from "./utils/observer/Observable.js";
const observer = Object.freeze(new Observer());
export default observer;
const $root = document.getElementById("root");
new App({ $target: $root });
