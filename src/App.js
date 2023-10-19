import api from "./api/api.js";
import { API_DOCUMENT } from "./api/url.js";

export default function App({ $target }) {
  const $container = document.createElement("div");
  $container.innerHTML = "Hello World!";
  $target.appendChild($container);

  this.render = async () => {
    const data = await api.get(API_DOCUMENT);
    console.log(data);
  };

  this.render();
}
