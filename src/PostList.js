import Post from "./Post.js";
import { request } from "./Api.js";

export default function PostList({
  $target,
  initialState,
  //라우터 설명
  //   getRootData,
  onSelect,
  onInsert,
  onDelete,
  onNewPost,
}) {
  const $ul = document.createElement("ul");
  $target.appendChild($ul);

  this.state = initialState;

  let isAlreadyRender = false;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  //라우터 설명
  //   getRootData();

  // node.prototype.replaceChild();

  this.render = () => {
    if (isAlreadyRender === true) {
      $ul.innerHTML = "";
      isAlreadyRender = false;
    }

    const $div = document.createElement("div"); // div

    this.state.forEach(({ id, title, documents }) => {
      Post({
        id,
        title,
        documents,
        $target: $div,
        onSelect,
        onInsert,
        onDelete,
        onNewPost,
      });
    });
    isAlreadyRender = true;
    $ul.appendChild($div);

    const $button = document.createElement("button");
    $ul.appendChild($button);
    $button.className = "newpage-button";
    $button.innerText = "+ 새페이지";

    const $newPageCreateButton = document.querySelector(".newpage-button");
    $newPageCreateButton.addEventListener("click", (e) => {
      const value = this.state;
      onNewPost(value);
    });
  };
}
