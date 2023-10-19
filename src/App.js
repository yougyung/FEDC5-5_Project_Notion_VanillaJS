import DocumentTree from "./components/DocumentTree.js";

export default function App({ $target }) {
  const $container = document.createElement("div");
  $container.className = "container";
  $target.appendChild($container);

  new DocumentTree({ $target: $container });

  this.render = () => {};

  this.render();
}
