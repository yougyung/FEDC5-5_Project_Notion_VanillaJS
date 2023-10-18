export default function DocumentAddButton({ $target, onAdd }) {
  const $documentAddButton = document.createElement("button");
  $documentAddButton.className = "add-button";
  $documentAddButton.type = "button";
  $target.appendChild($documentAddButton);

  this.render = () => {
    $documentAddButton.innerHTML = `
      +
    `;
  };

  $documentAddButton.addEventListener("click", () => {
    onAdd();
  });

  this.render();
}
