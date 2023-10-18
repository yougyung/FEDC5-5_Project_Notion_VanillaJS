export default function DocumentAddButton({ $target }) {
  const $documentAddButton = document.createElement("button");
  $target.appendChild($documentAddButton);

  this.render = () => {
    $documentAddButton.innerHTML = `+`;
  };

  this.render();
}
