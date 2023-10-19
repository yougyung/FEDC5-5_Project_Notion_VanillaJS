import List from "./List.js";

export default function ChildrenList({ target, state }) {
  const childrenListElement = document.createElement("ul");
  childrenListElement.setAttribute(
    "class",
    "menubar_pageList_list_childrenList"
  );
  target.appendChild(childrenListElement);

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
