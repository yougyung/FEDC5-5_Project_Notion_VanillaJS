export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");
  $editor.setAttribute("class", "editor-container");
  $editor.innerHTML = `
    <input type="text" id="editor-title" name="title" />
    <textarea id="editor-content" name="content"></textarea>
  `;
  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector("#editor-title").value = this.state.title || "";
    $editor.querySelector("#editor-content").value = this.state.content || "";
  };

  this.render = () => {};

  $editor.addEventListener("keyup", (e) => {
    const { name } = e.target;

    this.setState({
      ...this.state,
      [name]: e.target.value,
    });

    onEditing(this.state);
  });
}
