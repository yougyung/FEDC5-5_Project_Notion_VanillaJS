import CreateListInPost from "./CreateListInPost.js";
import isChildPostsOpened from "./isChildPostsOpened.js";

export default function Post({ depth, documents, $target }) {
  documents.forEach(async ({ id, title, documents: childDocuments }) => {
    const $ul = document.createElement("ul");
    const $li = CreateListInPost({ depth, id, title });

    $ul.appendChild($li);

    $target.appendChild($ul);

    if (isChildPostsOpened(id)) {
      $ul.className = "children-post-block";
      $li.parentNode.parentNode
        .querySelector("li")
        .querySelector(
          ".toggle-button"
        ).innerHTML = `<i class="fa-solid fa-angle-down"></i>`;
    } else {
      $ul.className = "children-post";
    }

    Post({
      depth: depth + 1,
      documents: childDocuments,
      $target: $ul,
    });
  });
}
