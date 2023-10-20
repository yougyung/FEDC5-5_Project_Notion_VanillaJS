export default function DocumentDetail({ $target, initialState }) {
  this.state = initialState;
  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  const $documentDetail = document.createElement('div');
  $target.appendChild($documentDetail);

  this.render = () => {};
  this.render();
}
