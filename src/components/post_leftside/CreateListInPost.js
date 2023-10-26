import LinkButton from "../common/LinkButton.js";
import { getItem } from "../../storage/Storage.js";

export default function CreateListInPost({ depth, id, title }) {
  const $li = document.createElement("li");

  $li.className = "list";
  $li.setAttribute("data-id", id);
  const selectedListId = getItem("selectedListId", "");
  if (selectedListId && id === selectedListId) {
    $li.className = "selected-list";
  }

  $li.style.paddingLeft = `${12 * depth}px`;

  LinkButton({
    $target: $li,
    buttonName: "<i class='fa-solid fa-angle-right'></i>",
    className: "toggle-button",
    buttonType: "toggle",
  });

  const $container = document.createDocumentFragment();

  const $p = document.createElement("p");
  title === "" ? ($p.innerText = "제목 없음") : ($p.innerText = title);
  $p.className = "title";
  //   $li.appendChild($p);
  $container.appendChild($p);

  const $buttonDiv = document.createElement("div");
  $buttonDiv.className = "button-div";
  //   $li.appendChild($buttonDiv);
  $container.appendChild($buttonDiv);

  $li.appendChild($container);

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

  return $li;
}
