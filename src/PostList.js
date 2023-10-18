export default function PostList({ $target, initialState }) {
  const $postList = document.createElement("ul");
  $postList.className = "list-depth-1";
  $target.appendChild($postList);

  this.state = initialState;

  const createDocumentHtml = (docList, ul, listDepth) => {
    if (docList.length === 0) return;
    else {
      for (let i = 0; i < docList.length; i++) {
        const $li = document.createElement("li");
        $li.style.paddingLeft = "15px";

        // ${docList[i].documents.length >= 1 ? "↓" : ""} 📄${docList[i].title}
        $li.innerHTML = `
          ↓📄${docList[i].title}
          <button>+</button>
        `;

        ul.appendChild($li);

        if (docList[i].documents.length >= 1) {
          const $ul = document.createElement("ul");
          $ul.className = `list-depth-${listDepth}`;
          $li.appendChild($ul);
          createDocumentHtml(docList[i].documents, $ul, listDepth + 1);
        }
      }
    }
  };

  createDocumentHtml(this.state, $postList, 2);

  this.render = () => {};
}
