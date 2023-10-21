import { makeRouterEvent } from "../../../Router/Router.js";
import SubList from "./SubList.js";

export default function SubPageList({ target, state }) {
  const subPageListElement = document.createElement("ul");
  subPageListElement.setAttribute("class", "pageViewer_subPageList");
  target.appendChild(subPageListElement);

  this.state = state;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    subPageListElement.replaceChildren();

    this.state.forEach((list) => {
      new SubList({
        target: subPageListElement,
        state: list,
      });
    });
  };

  subPageListElement.addEventListener("click", (e) => {
    const liTargetElement = e.target.closest(".pageViewer_subPageList_sublist");
    const { id } = liTargetElement.dataset;

    if (id) {
      makeRouterEvent({ url: `/documents/${id}`, event: "push" });
    }
  });
}
