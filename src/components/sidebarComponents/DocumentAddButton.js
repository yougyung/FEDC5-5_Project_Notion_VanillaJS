export default function DocumentAddButton({ $target, initialState, onAdd }) {
  const $documentAddButton = document.createElement("button");
  $documentAddButton.className = "add-button";
  $documentAddButton.type = "button";
  $target.appendChild($documentAddButton);

  this.state = initialState;

  this.render = () => {
    $documentAddButton.innerHTML = `
    <i class="fa-solid fa-plus add-button"></i>
    `;
  };

  this.render();

  $documentAddButton.addEventListener("click", () => {
    onAdd("new");
  });
}
