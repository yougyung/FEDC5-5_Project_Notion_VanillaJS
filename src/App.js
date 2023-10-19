export default function App({ $target }) {
  const $container = document.createElement("div");
  $container.innerHTML = "Hello World!";
  $target.appendChild($container);
}
