import CreateDOM from "../Components/PageViewer/Editor/CreateEditDOM.js";

export function controlKey({ event, target }) {
  /* Enter new create Element */

  //  선택한 요소 바로 인접 형제요소로 들어가도록
  if (event.key === "Enter") {
    event.preventDefault();
    new CreateDOM({
      target,
      element: "div",
    });
  }

  /* BackSpace Element Delete */

  //  첫번째 줄일때 삭제 방지
  if (event.key === "Backspace" && event.target.innerText.length === 0) {
    event.target.remove();
  }

  if (event.key === "ArrowUp" && event.target.previousSibling) {
    event.target.previousSibling.focus();
  }

  if (event.key === "ArrowDown" && event.target.nextSibling) {
    event.target.nextSibling.focus();
  }
}
