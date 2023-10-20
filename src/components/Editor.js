export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");
  $editor.setAttribute("class", "editor-wrap");

  $editor.innerHTML = `
    <input type="text" id="editor-title" name="title" />
    <textarea id="editor-content" name="content"></textarea>
  `;
  $target.appendChild($editor);

  let init = false;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector("#editor-title").value = this.state.title || "";
    $editor.querySelector("#editor-content").value = this.state.content || "";
    this.render();
  };

  this.render = () => {
    if (!init) {
      $editor.innerHTML = `
        <input type="text" id="editor-title" name="title" class="test"/>
        <textarea id="editor-content" name="content"></textarea>
      `;
      init = true;
    }
  };

  $editor.addEventListener("keyup", (e) => {
    const { name } = e.target;
    const parentId = history.state ? history.state.parentId : null;

    if (this.state[name] !== undefined) {
      this.setState({
        ...this.state,
        [name]: e.target.value,
        parentId,
      });

      onEditing(this.state);
    }
  });
}
