import { push } from "../utils/router.js";

export default function DocumentAddButton({ $target, initialState }) {
  const $documentAddButton = document.createElement("button");
  $documentAddButton.className = "add-button";
  $documentAddButton.type = "button";
  $target.appendChild($documentAddButton);

  this.state = initialState;

  this.render = () => {
    $documentAddButton.innerHTML = `
      +
    `;
  };

  this.render();

  $documentAddButton.addEventListener("click", () => {
    // editpage는 변경됨, 그러나 아직 documentlist에 새로운 document가 추가되지 않음.
    push("new");

    // documentlist의 state를 변경하면서 새로운 document를 추가해야 함.
  });
}
