import { request } from "../api.js";
import Editor from "../textEditor/Editor.js";
import SidebarHeader from "./SidebarHeader.js";

export default function DocumentList({ $target, initialState }) {
  const $documentList = document.createElement("section");
  $target.appendChild($documentList);

  const $app = document.querySelector("#app");

  const editor = new Editor({
    $target: $app,
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

      const document = await request(`${id}`);

      editor.setState(document);
    }
  });

  new SidebarHeader({
    $target,
    username: "Roto",
  });

  this.render();
}
