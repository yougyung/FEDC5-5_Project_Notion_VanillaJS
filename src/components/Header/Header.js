import style from "./header.module.css";
import { navigate } from "../../utils/router";
import { $ } from "../../utils/DOM";

/** 지금 선택된 document의 id */
export default function Header({ $target, initialState }) {
  const $header = document.createElement("div");

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  const findParent = (headerTitleArray, $now) => {
    const nowTitle = $now
      .querySelector(".document")
      .querySelector("span").textContent;

    headerTitleArray.push({ id: this.state, title: nowTitle });
    let $parent = $now.parentElement;

    while ($parent && $parent.classList.contains("document-title")) {
      const parentTitle = $parent
        .querySelector(".document")
        .querySelector("span").textContent;

      const { id } = $parent.dataset;
      headerTitleArray.push({ id: id, title: parentTitle });
      $parent = $parent.parentElement;
    }

    return headerTitleArray.reverse();
  };

  this.render = () => {
    const headerTitleArray = [];
    const $now = $(`ul[data-id="${this.state}"]`);

    const parentTitles = findParent(headerTitleArray, $now);
    console.log("결과", parentTitles);

    $header.innerHTML = `${parentTitles
      .map(
        parent =>
          `<p data-id="${parent.id}" class="header-p" >${parent.title}</p>`,
      )
      .join("")}`;

    $target.appendChild($header);
  };

  $header.addEventListener("click", ({ target }) => {
    const $p = target.closest(".header-p");
    console.log("클릭");

    if ($p) {
      const { id } = $p.dataset;

      navigate(`/documents/${id}`);
    }
  });

  // this.render();
}
