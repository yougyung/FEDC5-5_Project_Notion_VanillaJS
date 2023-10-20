export default function Document({ $target }) {
  const $document = document.createElement("div");
  $document.className = "document";
  $document.textContent = "document";
  $target.appendChild($document);

  this.state = null;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {};
}
