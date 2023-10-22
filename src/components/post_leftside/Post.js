import LinkButton from "../common/LinkButton.js";

export default function Post({ id, title, documents, $target }) {
  const $li = document.createElement("li");
  $li.innerText = title;
  $li.className = "list";
  $li.setAttribute("data-id", id);

  LinkButton({ $target: $li, buttonName: "+", className: "insert-button" });
  LinkButton({ $target: $li, buttonName: "x", className: "delete-button" });

  const tempElement = document.createElement("ul");

  $target.appendChild($li);
  $li.appendChild(tempElement);

  documents.forEach(({ id, title, documents: childDocuments }) => {
    Post({
      id,
      title,
      documents: childDocuments,
      $target: tempElement,
    });
  });
}
