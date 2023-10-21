import { makeRouterEvent } from "../../../Router/Router.js";
import SubEmptyList from "./SubEmptyList.js";
import SubList from "./SubList.js";

export default function SubPageList({ target, state }) {
  const subPageListElement = document.createElement("ul");
  subPageListElement.setAttribute("class", "pageViewer_subPage_subPageList");
  target.appendChild(subPageListElement);

  this.state = state;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    subPageListElement.replaceChildren();

    if (this.state.length === 0) {
      new SubEmptyList({ target: subPageListElement });
      return;
    }

    this.state.forEach((list) => {
      new SubList({
        target: subPageListElement,
        state: list,
      });
    });
  };

  subPageListElement.addEventListener("click", (e) => {
    const liTargetElement = e.target.closest(
      ".pageViewer_subPage_subPageList_subList"
    );

    if (liTargetElement === e.target) {
      const { id } = liTargetElement.dataset;

      if (id) {
        makeRouterEvent({ url: `/documents/${id}`, event: "push" });
      }
    }
  });
}
