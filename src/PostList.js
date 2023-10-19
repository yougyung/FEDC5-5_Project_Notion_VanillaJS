export default function PostList({ $target, initialState }) {
  const $postList = document.createElement("ul");
  const $addPostWrapper = document.createElement("div");
  $addPostWrapper.innerHTML = `<button>문서생성!</button`;
  $postList.className = "list-depth-1";
  $target.appendChild($postList);
  $target.appendChild($addPostWrapper);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const createDocumentHtml = (postArray, ul, listDepth) => {
    if (postArray.length === 0) return;
    else {
      for (let i = 0; i < postArray.length; i++) {
        const $li = document.createElement("li");
        $li.dataset.id = postArray[i].id;

        $li.style.paddingLeft = "15px";

        $li.innerHTML = `
          ↓📄${postArray[i].title}
          <button class="delete">x</button>
          <button class"add">+</button>
        `;

        ul.appendChild($li);

        if (postArray[i].documents.length >= 1) {
          const $ul = document.createElement("ul");
          $ul.className = `list-depth-${listDepth}`;
          $li.appendChild($ul);
          createDocumentHtml(postArray[i].documents, $ul, listDepth + 1);
        }
      }
    }
  };

  this.render = () => {
    createDocumentHtml(this.state, $postList, 2);
  };
  this.render();

  $postList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const { id } = $li.dataset;

    history.pushState(null, null, `/posts/${id}`);
  });
}
