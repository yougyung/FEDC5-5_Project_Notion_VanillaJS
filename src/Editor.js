export default function Editor({ $target, initialState }) {
  const $editor = document.createElement('textarea');
  $editor.setAttribute('id', 'editor');
  $editor.setAttribute('name', 'text');

  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {};

  this.render();
}
