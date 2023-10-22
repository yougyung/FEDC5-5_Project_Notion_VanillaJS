import { push } from "./router.js";
import { addNewData, deleteData } from "./Api.js";

export default function Post({
  id,
  title,
  documents,
  $target,

  onInsert,
  onDelete,
  onNewPost,
}) {
  const $li = document.createElement("li");
  $li.innerText = title;
  $li.setAttribute("data-id", id);
  const $deleteButton = document.createElement("button");
  $deleteButton.innerText = "x";

  const $insertButton = document.createElement("button");
  $insertButton.innerText = "+";

  const tempElement = document.createElement("ul");

  $target.appendChild($li);
  $li.appendChild($insertButton);
  $li.appendChild($deleteButton);
  $li.appendChild(tempElement);

  $insertButton.addEventListener("click", async (e) => {
    const $li = e.target.closest("li");
    const { id } = $li.dataset;
    const newData = await addNewData(id); // await 붙이면 왜 되지..?
    push(newData.id);
    e.stopImmediatePropagation();
  });

  $deleteButton.addEventListener("click", async (e) => {
    const $li = e.target.closest("li");
    const { id } = $li.dataset;
    await deleteData(id);
    push("");
  });

  $li.addEventListener("click", (e) => {
    const $targetLi = e.target.closest("li");
    const { id } = $targetLi.dataset;
    push(id);
    e.stopImmediatePropagation();
  });

  documents.forEach(({ id, title, documents: childDocuments }) => {
    Post({
      id,
      title,
      documents: childDocuments,
      $target: tempElement,

      onInsert,
      onDelete,
      onNewPost,
    });
  });
}
