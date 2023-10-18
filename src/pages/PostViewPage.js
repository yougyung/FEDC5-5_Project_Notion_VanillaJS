import Editor from "../Editor.js";

export default function PostViewPage({ $target }) {
  const $page = document.createElement("div");
  $page.className = "post-view-page";

  $target.appendChild($page);

  const editor = new Editor({ $target: $page });
}
