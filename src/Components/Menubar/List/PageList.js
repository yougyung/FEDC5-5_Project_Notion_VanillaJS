import { makeRouterEvent } from "../../../Router/Router.js";
import List from "./List.js";

export default function PageList({ target, state, onEvent }) {
  /* 보유한 문서들 리스트 */
  const pageListElement = document.createElement("ul");
  pageListElement.setAttribute("class", "menubar_pageList");
  target.appendChild(pageListElement);

  /* 초기값 */
  this.state = state;

  this.setState = (newState) => {
    this.state = newState;
    pageListElement.replaceChildren();
    this.render();
  };

  /* list 렌더링 */
  this.render = () => {
    this.state.forEach((list) => {
      new List({
        target: pageListElement,
        state: list,
      });
    });
  };
  this.render();

  /* Event */
  pageListElement.addEventListener("click", (e) => {
    if (e.target.closest("li[data-id")) {
      const targetElement = e.target.closest("li[data-id]");
      const { id } = targetElement.dataset;
      const eventName = e.target.className;

      /* Link */

      if (eventName === "menubar_pageList_list_info_title") {
        e.preventDefault();
        makeRouterEvent({ url: `/documents/${id}`, event: "push" });
      }

      /* Delete Event */
      if (eventName === "menubar_pageList_list_info_deleteButton") {
        onEvent({ id, delete: true });
      }

      /* insert Event */
      if (eventName === "menubar_pageList_list_info_insertButton") {
        onEvent({ id, insert: true });
      }

      /* Toggle Event */
      if (eventName === "menubar_pageList_list_info_checkbox") {
        const checkBoxElement = targetElement.querySelector("input");
        const display = targetElement.querySelector("ul");

        if (checkBoxElement.checked) {
          display.classList.add("toggleChecked");
        }

        if (!checkBoxElement.checked) {
          display.classList.remove("toggleChecked");
        }
        console.log(display);
      }
    }
  });
}