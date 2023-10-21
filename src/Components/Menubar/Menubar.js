import PageList from "./List/PageList.js";

export default function Menubar({ target, state, onEvent }) {
  /* 왼쪽 메뉴 관련 */
  const menubarElement = document.createElement("article");
  target.appendChild(menubarElement);
  menubarElement.setAttribute("class", "menubar");

  /* 기본 초기값 */
  this.state = state;

  this.setState = (newState) => {
    this.state = newState;
    pageList.setState(this.state);
  };

  /* Root page insert Event */
  const rootInsertButton = document.createElement("button");
  rootInsertButton.innerHTML =
    '<p class="menubar_rootInsertButton_buttonTitle">New Page</p><p class="menubar_rootInsertButton_buttonImoji">+</p>';
  rootInsertButton.setAttribute("class", "menubar_rootInsertButton");
  menubarElement.appendChild(rootInsertButton);

  rootInsertButton.addEventListener("click", (e) => {
    if (e.target.className.includes("menubar_rootInsertButton")) {
      onEvent({ id: null, insert: true });
    }
  });

  /* 렌더링 */
  const pageList = new PageList({
    target: menubarElement,
    state: this.state,
    onEvent,
  });
}
