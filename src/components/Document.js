export default function Document({ $container }) {
  const $document = document.createElement("div");
  $document.className = "document";
  $document.textContent = "document";
  $container.appendChild($document);

  this.state = null;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {};
}
