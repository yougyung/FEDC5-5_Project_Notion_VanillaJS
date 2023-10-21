export default function DocumentAddButton({ $target, onAdd }) {
  const $documentAddButton = document.createElement("button");
  $target.appendChild($documentAddButton);

  this.render = () => {
    $documentAddButton.textContent = `새 페이지 추가`;
  };

  $documentAddButton.addEventListener("click", () => {
    onAdd("추가하기");
  })
  this.render();
}
