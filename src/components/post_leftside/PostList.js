import Post from "./Post.js";
import { push } from "../../router/router.js";
import { addNewData, deleteData } from "../../api/Api.js";

export default function PostList({ $target, initialState }) {
  const $div = document.createElement("div");
  $target.appendChild($div);

  this.state = initialState;

  let isRender = false;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (isRender === true) {
      $div.innerHTML = "";
      isRender = false;
    }

    const $ul = document.createElement("ul");

    this.state.forEach(({ id, title, documents }) => {
      Post({
        id,
        title,
        documents,
        $target: $div,
      });
    });
    isRender = true;
    $div.appendChild($ul);

    const $button = document.createElement("button");
    $ul.appendChild($button);
    $button.className = "newpage-button";
    $button.innerText = "+ 새페이지";

    const $newPageCreateButton = document.querySelector(".newpage-button");
    $newPageCreateButton.addEventListener("click", async () => {
      const newData = await addNewData(null);
      push(newData.id);
    });
  };

  $div.addEventListener("click", async (e) => {
    const { className } = e.target;
    if (className === "list") {
      const { id } = e.target.dataset;
      push(id);
    } else if (className === "insert-button") {
      const $li = e.target.closest("li");
      const { id } = $li.dataset;
      const newData = await addNewData(id);
      push(newData.id);
    } else if (className === "delete-button") {
      const $li = e.target.closest("li");
      const { id } = $li.dataset;
      await deleteData(id);
      push("");
    }
  });
}
