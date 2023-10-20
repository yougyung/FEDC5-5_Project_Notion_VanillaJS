export default function Documents({ $target, initialState }) {
  const $documents = document.createElement("div");
  $target.appendChild($documents);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state) {
      $documents.innerHTML = `${this.state}`;
    }
  };
  this.render();
}
