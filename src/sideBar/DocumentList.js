import { request } from "../utils/api.js";
import Editor from "../textEditor/Editor.js";

export default function DocumentList({ $target, initialState }) {
  const $documentList = document.createElement("div");
  $target.appendChild($documentList);
  const $content = document.createElement("div");
  const $app = document.querySelector("#app");
  $app.appendChild($content);
  $app.style.display= "flex";

  const editor = new Editor({
    $target: $content,
    initialState: {
      title: "",
      content: "",
    },
  });

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $documentList.innerHTML = `
            <ul>
                ${this.state
                  .map(
                    (document) =>
                      `<li data-id=${document.id}>${document.title}</li>`
                  )
                  .join("")}
            </ul>
        `;
  };

  $documentList.addEventListener("click", async (e) => {
    const $li = e.target.closest("li");
    if ($li) {
      const { id } = $li.dataset;

      const document = await request(`/${id}`);

      editor.setState(document);
    }
  });
  this.render();
}
