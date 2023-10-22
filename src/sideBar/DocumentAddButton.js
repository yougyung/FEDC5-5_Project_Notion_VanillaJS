import { NEW } from "../utils/contants.js";

export default function DocumentAddButton({ $target, onAdd, intialState }) {
  const $documentAddButton = document.createElement("button");
  $documentAddButton.className = "add-button";
  $documentAddButton.type = "button";
  $target.appendChild($documentAddButton);

  this.state = intialState;

  this.render = () => {
    $documentAddButton.innerHTML = `
        새 페이지 추가  
      `;
  };

  $documentAddButton.addEventListener("click", () => {
    onAdd(NEW);
  });

  this.render();
}
