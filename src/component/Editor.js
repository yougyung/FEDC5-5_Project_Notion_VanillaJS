/*
initialState = {title, content:HTML 요소} 
*/
export default function Editor({ $target, initialState, documentAutoSave }) {
  const $editor = document.createElement("section");
  $editor.classList.add("editor");
  $target.appendChild($editor);
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  //
  $editor.innerHTML = `
  <input class="editor-input" placeholder="제목 없음" data-name="title" />
  <div class="content-wrapper"> 
    <div class="content" contenteditable="true" placeholder="내용을 입력하쎄용"></div>
  </div>
  `;
  this.render = () => {
    $editor.querySelector("[data-name=title]").value = this.state.title;
  };
  this.renderContent = () => {
    if (this.state.content && this.state.content.length)
      $editor.querySelector(".content-wrapper").innerHTML = this.state.content;
  };
  const makeNewLine = () => {
    const newLine = document.createElement("div");
    newLine.setAttribute("class", "content");
    newLine.setAttribute("contenteditable", true);
    newLine.setAttribute("placeholder", "내용을 입력하쎄용");
    return newLine;
  };
  const convertMarkDown = (text) => {
    const converted = text.split("\n").map((line) => {
      if (line.indexOf("# ") === 0) {
        return `<h1>${line.substring(2)}</h1>`;
      } else if (line.indexOf("## ") === 0) {
        return `<h2>${line.substring(3)}</h2>`;
      } else if (line.indexOf("### ") === 0) {
        return `<h3>${line.substring(4)}</h3>`;
      } else if (line.indexOf("#### ") === 0) {
        return `<h4>${line.substring(5)}</h4>`;
      }
      return line;
    });
    console.log(converted);
    return converted.join("\n");
  };
  const keyDownHandler = (e) => {
    //innerHTML수정하면 등록된 핸들러 날아가니까, 이벤트 위임 사용
    const $textBox = $editor.querySelector(".content-wrapper :last-child");
    if (e.target !== $textBox) return;
    //엔터 칠때마다 새로운 div 생성
    if (e.isComposing) return; //isComposing은 합성글자(한글같은 문자)에대해 체크해준다.
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        const nextLine = makeNewLine();
        nextLine.addEventListener("keydown", keyDownHandler);
        $textBox.after(nextLine); //다음 형제로 삽입해준다
        nextLine.focus();
        break;
      case "Backspace":
        const target = e.currentTarget;
        if (!target.innerHTML) {
          e.preventDefault();
          const prevLine = target.previousElementSibling;
          prevLine.focus();
          getSelection().collapse(prevLine, prevLine.childNodes.length);
          target.remove();
        }
        break;
      case "ArrowUp":
        e.currentTarget.previousElementSibling.focus();
        break;
      case "ArrowDown":
        e.currentTarget.nextElementSibling.focus();
        break;
    }
  };
  $editor.addEventListener("keydown", keyDownHandler);
  const onInputHandler = (e) => {
    let nextState = { ...this.state };
    if (e.target.dataset.name === "title") {
      nextState = {
        ...nextState,
        title: e.target.value,
      };
    } else if (e.target.className === "content") {
      const converted = convertMarkDown(e.target.innerHTML);
      const prevCaret = getSelection().anchorOffset;
      e.target.innerHTML = converted;
      e.target.focus();
      getSelection().collapse(e.target.childNodes[0], prevCaret);
      const content = e.target.parentNode.innerHTML;
      nextState = {
        ...nextState,
        content,
      };
    }
    this.setState(nextState);
    const { id, title, content } = this.state;
    const requestBody = { title, content };
    documentAutoSave(id, requestBody);
  };
  $editor.addEventListener("input", onInputHandler);
  this.render();
}
