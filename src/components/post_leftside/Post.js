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

  $li.className = "list";
  $li.setAttribute("data-id", id);

  LinkButton({
    $target: $li,
    buttonName: ">",
    className: "toggle-button",
    buttonType: "toggle",
  });
  const $p = document.createElement("p");
  $p.innerText = title;
  $p.className = "title";
  $li.appendChild($p);

  LinkButton({ $target: $li, buttonName: "+", className: "insert-button" });
  LinkButton({ $target: $li, buttonName: "x", className: "delete-button" });

  const tempElement = document.createElement("ul");

  $target.appendChild($li);
  $li.appendChild(tempElement);

  // li 밑에 ul

  const showLists = getItem("showId", []);

  if (showLists.includes(parseInt(id))) {
    $target.className = "children-post-block";
  } else {
    $target.className = "children-post";
  }

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
