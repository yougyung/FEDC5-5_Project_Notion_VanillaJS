function App({ $target }) {
  const $app = document.createElement("section");
  $app.textContent = "Hello World!";
  $target.appendChild($app);
}

export default App;
