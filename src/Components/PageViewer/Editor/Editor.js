import EditContent from "./EditContent.js";
import EditInfo from "./EditInfo.js";
import EditTitle from "./EditTitle.js";

export default function Editor({ target, state, onEditing }) {
  const editorElement = document.createElement("div");
  editorElement.setAttribute("class", "pageViewer_editor");
  target.appendChild(editorElement);

  this.state = state;

  this.render = () => {
    const { title, createdAt, updatedAt, content } = this.state;

    new EditTitle({
      target: editorElement,
      title: title,
    });

    if (createdAt && updatedAt) {
      new EditInfo({
        target: editorElement,
        state: {
          createdAt,
          updatedAt,
        },
      });
    }

    new EditContent({
      target: editorElement,
      content,
    });
  };

  this.render();

  /* Event */

  editorElement.addEventListener("keyup", () => {
    const titleValue =
      editorElement.querySelector("[data-name=title]").value ?? "";
    const contentValue =
      editorElement.querySelector("[data-name=content]").innerText ?? "";

    const newState = {
      id: this.state.id,
      title: titleValue,
      content: contentValue,
      createdAt: this.state.createdAt,
      updatedAt: this.state.updatedAt,
    };
    onEditing(newState);
  });
}
