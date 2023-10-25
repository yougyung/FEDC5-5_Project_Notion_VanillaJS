import LinkButton from "../common/LinkButton.js";
import { getItem } from "../../storage/Storage.js";

export default function Post({
  depth,
  id,
  title,
  documents,
  isToggled,
  $target,
}) {
  const $li = document.createElement("li");

  $li.className = `list-${id}`;
  $li.setAttribute("data-id", id);

  LinkButton({
    $target: $li,
    buttonName: "<i class='fa-solid fa-angle-right'></i>",
    className: "toggle-button",
    buttonType: "toggle",
  });
  const $p = document.createElement("p");
  title === "" ? ($p.innerText = "제목 없음") : ($p.innerText = title);
  // $p.innerText = title;
  $p.className = "title";
  $li.appendChild($p);

  const $buttonDiv = document.createElement("div");
  $buttonDiv.className = "button-div";
  $li.appendChild($buttonDiv);

  LinkButton({
    $target: $buttonDiv,
    buttonName: "<i class='fa-solid fa-plus'></i>",
    className: "insert-button",
  });
  LinkButton({
    $target: $buttonDiv,
    buttonName: "<i class='fa-regular fa-trash-can'></i>",
    className: "delete-button",
  });

  const tempElement = document.createElement("ul");

  $target.appendChild($li);
  $li.appendChild(tempElement);

  const showLists = getItem("showId", []);

  if (showLists.includes(parseInt(id))) {
    $target.className = "children-post-block";
  } else {
    $target.className = "children-post";
  }

  // const $test = document.querySelector(`li[data-id="${id}"]`);

  $li.addEventListener("mouseenter", () => {
    // $li.classList.add("highlight");
    const $blockedLists = document.querySelectorAll(".button-div-post");
    $blockedLists.forEach(($blockedList) => {
      $blockedList.classList.remove("button-div-post");
      $blockedList.classList.add("button-div");
    });
    const $buttonDiv = $li.querySelector(".button-div");
    $buttonDiv.classList.add("button-div-post");
  });

  $li.addEventListener("mouseleave", (e) => {
    const $buttonDiv = $li.querySelector(".button-div-post");
    // console.log($buttonDiv);
    if ($buttonDiv) {
      $buttonDiv.classList.remove("button-div-post");
      $buttonDiv.classList.add("button-div");
    }
    e.stopImmediatePropagation();
  });

  documents.forEach(({ id, title, documents: childDocuments }) => {
    Post({
      depth: ++depth,
      id,
      title,
      documents: childDocuments,
      isToggled,
      $target: tempElement,
    });
  });
}
