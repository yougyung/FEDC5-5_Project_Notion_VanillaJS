import Post from "./Post.js";
import { request } from "./Api.js";

export default function PostList({
  $target,
  initialState,
  getRootData,
  onSelect,
  onInsert,
  onDelete,
}) {
  const $ul = document.createElement("ul");
  $target.appendChild($ul);

  this.state = initialState;

  let isAlreadyRender = false;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  getRootData();

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
      });
    });
    isAlreadyRender = true;
    $ul.appendChild($div);
  };
}
