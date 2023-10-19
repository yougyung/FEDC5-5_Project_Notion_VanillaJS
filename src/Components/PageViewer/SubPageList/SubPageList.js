import { makeRouterEvent } from "../../../Router/Router.js";
import SubList from "./SubList.js";

export default function SubPageList({ target, documents }) {
  const subPageListElement = document.createElement("ul");
  subPageListElement.setAttribute("class", "pageViewer_subPageList");
  target.appendChild(subPageListElement);

  documents.forEach((list) => {
    new SubList({
      target: subPageListElement,
      state: list,
    });
  });

  subPageListElement.addEventListener("click", (e) => {
    const liTargetElement = e.target.closest(".pageViewer_subPageList_sublist");
    const { id } = liTargetElement.dataset;

    if (id) {
      makeRouterEvent({ url: `/documents/${id}`, event: "push" });
    }
  });
}
