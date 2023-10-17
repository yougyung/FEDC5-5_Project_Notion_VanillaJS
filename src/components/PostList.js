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
          post => `<li data-id="${post.id}">
      <p>${post.title}<p> ${subPages(post.documents)}
      </li>`,
        )
        .join("");

    const subPages = documents =>
      documents.map(sub => `<p>${sub.title}</p>`).join("");

    $postList.innerHTML = `<ul>${rootPages(this.state)}</ul>`;
  };

  this.render();

  //   $postList.addEventListener("click", (e) => {
  //     const $li = e.target.closest("li");

  //     if ($li) {
  //       const { id } = $li.dataset;
  //       push(`/posts/${id}`);
  //     }
  //   });
}
