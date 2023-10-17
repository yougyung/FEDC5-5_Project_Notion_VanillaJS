import App from "./App.js";
import style from "./global.module.css";

const $target = document.querySelector("#app");
$target.className = style.container;

new App({ $target });
