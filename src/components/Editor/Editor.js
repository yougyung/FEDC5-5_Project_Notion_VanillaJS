export default function Editor({ $target, initialState }) {
  const $editor = document.createElement("div");
  $editor.className = "editor";
  $editor.innerHTML = `
    <input class='editor_title' type="text" name="title" placeholder='제목을 입력하세요'/>
    <div class='editor_content' name="content" contentEditable='true'></div>
  `;
  this.state = initialState;
  $target.appendChild($editor);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    console.log(this.state);
    $editor.querySelector("[name=title]").value = this.state.title;

    const $content = $editor.querySelector("[name=content]");
  };

  $editor.querySelector("[name=title]").addEventListener("keyup", (e) => {
    this.setState({ ...this.state, title: e.target.value });
  });

  $editor.querySelector("[name=content]").addEventListener("input", (e) => {
    this.setState({ ...this.state, content: e.target.innerHTML });
  });
}
