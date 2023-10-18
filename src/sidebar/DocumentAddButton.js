export default function DocumentAddButton({ $target, documentId }) {
  const $documentAddButton = document.createElement("button");
  $documentAddButton.className = "add-button";
  $documentAddButton.type = "button";
  $documentAddButton.innerHTML = `+`;

  this.render = () => {
    $target.appendChild($documentAddButton);
    return $documentAddButton;
  };

  $documentAddButton.addEventListener("click", (event) => {
    event.stopPropagation();
    console.log("클릭!");
  });

  this.render();
}
