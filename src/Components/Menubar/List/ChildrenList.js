import { checkToggled } from "../../../LocalStorage/LocalStorage.js";
import List from "./List.js";

export default function ChildrenList({ target, state, id }) {
  const childrenListElement = document.createElement("ul");
  childrenListElement.setAttribute(
    "class",
    "menubar_pageList_list_childrenList"
  );
  target.appendChild(childrenListElement);

  if (checkToggled(id)) {
    childrenListElement.classList.add("toggleChecked");
  }

  this.state = state;

  this.render = () => {
    this.state.forEach((list) => {
      new List({
        target: childrenListElement,
        state: list,
      });
    });
  };

  this.render();
}
