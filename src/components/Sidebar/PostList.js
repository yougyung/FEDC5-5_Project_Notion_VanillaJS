import { navigate } from "../../utils/router";

export default function PostList({ $target, initialState }) {
  const $postList = document.createElement("div");
  $target.appendChild($postList);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const rootPages = pages =>
      pages
        .map(
          post => `<li>
      <p class="root-page" data-id="${post.id}">${post.title}<p> ${subPages(
            post.documents,
          )}
      </li>`,
        )
        .join("");

    const subPages = documents =>
      documents
        .map(sub => `<p class="sub-page" data-id="${sub.id}">${sub.title}</p>`)
        .join("");

    $postList.innerHTML = `<ul>${rootPages(this.state)}</ul>`;
  };

  this.render();

  /** ⭐  포스트 선택  */
  $postList.addEventListener("click", e => {
    const $li = e.target.closest("p");

    if ($li) {
      const { id } = $li.dataset;
      navigate(`/documents/${id}`);
    }
  });
}
