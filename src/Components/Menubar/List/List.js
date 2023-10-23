import ChildrenList from "./ChildrenList.js";
import ListInfo from "./ListInfo.js";

export default function List({ target, state }) {
  this.state = state;
  const { title, id, documents } = state;

  const listElement = document.createElement("li");
  listElement.setAttribute("class", "menubar_pageList_list");
  listElement.setAttribute("data-id", id);
  target.appendChild(listElement);

  this.render = () => {
    new ListInfo({
      target: listElement,
      state: { title, id },
    });

    new ChildrenList({
      target: listElement,
      state: documents,
      id,
    });
  };

  this.render();
}
