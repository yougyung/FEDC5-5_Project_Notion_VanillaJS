import ResizeMenu from "../MenuBar/ResizeMenu.js";
import { applyMarkup, removeMarkup } from "../Util/TextScan.js";
import { setCustomEvent } from "../Util/Router.js";

export default function Editor({ $target, initialState, EditPost }) {
  // 편집기 content 엘리먼트
  const $editor = document.createElement("div");
  $editor.setAttribute("class", "editDiv");
  $editor.setAttribute("name", "editor");
  $editor.setAttribute("contentEditable", "true");
  $editor.style.outline = 0;

  // 편집기 title 엘리먼트
  const $title = document.createElement("h1");
  $title.setAttribute("contentEditable", "true");
  $title.setAttribute("name", "title");
  $title.style.outline = 0;

  const resizeMenu = new ResizeMenu();

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);
    this.render();
  };

  // 편집기의 텍스트를 수정 시 -> 텍스트 내의 title, content, 해당 포스트의 id 콜백으로 전달
  const onEditTextKeyUpEvent = () => {
    // 포스트 title 수정 시 서버 저장
    $title.addEventListener("keyup", (e) => {
      const titleText = $title.innerText;
      const content = $editor.innerText;

      EditPost(titleText, content, this.state.id);
    });
    // 포스트 content 수정 시 서버 저장
    $editor.addEventListener("keyup", (e) => {
      const editText = applyMarkup($editor.innerText);
      console.log(editText);
      const titleText = $title.innerText;

      EditPost(titleText, editText, this.state.id);
    });
  };

  this.render = () => {
    // 편집기 초기 화면
    if (this.state === null) {
      $editor.innerHTML = `
        <h1>안녕하세요 🙌🏻</h1>
        <h3>이 화면은 초기 화면입니다.</h3>
        <h3>나만의 포스트를 작성해 보세요. 👨‍💻</h3>`;

      $target.appendChild($editor);

      return;
    }

    const { title } = this.state;

    $title.textContent = title;

    $editor.innerHTML = `
      ${this.state.content}
    `;

    $target.appendChild($title);
    $target.appendChild($editor);

    resizeMenu.render();

    // 하위 post 링크
    this.state.documents.forEach((element) => {
      const $div = document.createElement("div");
      $div.setAttribute("class", " link");
      $div.contentEditable = false;
      $div.style.width = "auto";

      $div.innerHTML = `📃 ${element.title} <br>`;

      $div.addEventListener("click", (e) => setCustomEvent(element.id));
      $editor.appendChild($div);
    });

    onEditTextKeyUpEvent();
    removeMarkup($editor);
  };
}
