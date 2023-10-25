export default function Editor({ $target, initialState }) {
  const $editor = document.createElement("div");
  $editor.className = "editor";
  $editor.innerHTML = `
    <input class='editor_name' type="text" name="title" placeholder='제목을 입력하세요'/>
    <div class='editor_content' name="content" contentEditable='true'></div>
  `;
  this.state = initialState;
  $target.appendChild($editor);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {};
}
