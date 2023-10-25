import { controlKey } from "../../../Event/ControlKey.js";
import clickEvent from "../../../Event/ControlKey/ClickEvent.js";
import contextMenuEvent from "../../../Event/ControlKey/ContextMenuEvent.js";
import handleTyping from "../../../Event/HandleTyping.js";
import RenderFormatConverter from "../../../Function/RenderFormatConverter.js";
import CreateEditTextElement from "./CreateEditTextElement.js";

export default function EditContent({ target, state }) {
  const editContentElement = document.createElement("div");
  editContentElement.focus();
  editContentElement.setAttribute("class", "pageViewer_editor_content");
  editContentElement.setAttribute("data-name", "content");
  target.appendChild(editContentElement);

  this.state = state;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    editContentElement.replaceChildren();
    if (!this.state || this.state.length === 0) {
      new CreateEditTextElement({
        target: editContentElement,
      });
      return;
    }

    const splited = this.state.split("<cut>");

    splited.forEach((item) => {
      RenderFormatConverter({
        text: item,
        target: editContentElement,
      });
    });
  };

  editContentElement.addEventListener("keydown", (event) => {
    controlKey({
      event,
      target: editContentElement,
    });
  });

  editContentElement.addEventListener("keyup", (event) => {
    handleTyping({ event });
  });

  editContentElement.addEventListener("contextmenu", (event) => {
    contextMenuEvent({
      event,
    });
  });

  editContentElement.addEventListener("click", (event) => {
    clickEvent({ event });
  });
}
