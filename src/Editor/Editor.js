import { textScan } from "../Util/TextScan.js";

export default function Editor({ $target, initialState, EditPost }) {
  // 편집기 content 엘리먼트
  const $editor = document.createElement("div");
  $editor.setAttribute("class", "editDiv");
  $editor.setAttribute("name", "editor");
  $editor.setAttribute("contentEditable", "true");

  // 편집기 title 엘리먼트
  const $title = document.createElement("h1");
  $title.setAttribute("contentEditable", "true");
  $title.setAttribute("name", "title");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);
    this.render();
  };

  // 편집기의 텍스트를 수정 시 -> 텍스트 내의 title, content, 해당 포스트의 id 콜백으로 전달
  const onEditText = () => {
    // 포스트 title 수정 시 서버 저장
    $title.addEventListener("keyup", (e) => {
      const titleText = $title.innerText;
      const content = $editor.innerText;

      EditPost(titleText, content, this.state.id);
    });
    // 포스트 content 수정 시 서버 저장
    $editor.addEventListener("keyup", (e) => {
      const editText = textScan($editor.innerText);
      const titleText = $title.innerText;

      EditPost(titleText, editText, this.state.id);
    });
  };

  // Editor가 포커싱되면 마크업된 텍스트 앞에 마크다운 태그 붙힘 -> 이벤트는 한번만 동작
  const onEditorFocus = () => {
    $editor.addEventListener(
      "focusin",
      (e) => {
        document.querySelectorAll("h1").forEach((e, i) => {
          if (i !== 0) e.innerText = `# ${e.innerText}`;
        });
        document
          .querySelectorAll("h2")
          .forEach((e) => (e.innerText = `## ${e.innerText}`));
        document
          .querySelectorAll("h3")
          .forEach((e) => (e.innerText = `### ${e.innerText}`));
      },
      { once: true }
    );
  };

  this.render = () => {
    // 편집기 초기 화면
    if (this.state === null) {
      $editor.innerHTML = `
        <h1>안녕하세요 🙌🏻</h1>
        <h3>이 화면은 초기 화면입니다. 나만의 포스트를 작성해 보세요 👨‍💻</h3>`;

      $target.appendChild($editor);

      return;
    }

    const { title, id, content } = this.state;

    $title.textContent = title;
    $editor.innerHTML = `
      ${this.state.content}
    `;

    $target.appendChild($title);
    $target.appendChild($editor);

    onEditText();
    onEditorFocus();
  };
}
