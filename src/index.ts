import { createComponent } from "./core";
import App from "./App";

export function render() {
  const $app = document.getElementById("app");

  if (!$app) throw new Error("비정상적인 접근입니다.");

  const componentInstance = createComponent(App);
  $app.innerHTML = componentInstance.element;
  componentInstance.bindEvents?.();
}

render();
