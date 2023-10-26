import { CREATED_DOCUMENTS_PARENT_ID_KEY } from "../utils/key.js";
import { push } from "../utils/router.js";
import { getItem, removeItem } from "../utils/storage.js";
import { AddElements } from "./components/elements.js";

export default function Header({ $target, text }) {
  // root directory를 만드는 역할.
  const $header = document.createElement("header");
  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = `
            <h4>${text}</h4>
            ${AddElements({ id: "root" })}
        `;
  };

  this.render();

  $header.addEventListener("click", (e) => {
    const { target } = e;

    if (target.classList.contains("add")) {
      const isExist = getItem(CREATED_DOCUMENTS_PARENT_ID_KEY, null);
      if (isExist) removeItem(CREATED_DOCUMENTS_PARENT_ID_KEY);
      push(`/documents/new`);
    }
  });
}
