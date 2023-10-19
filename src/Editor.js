export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");
  $editor.className = "editor";
  $target.appendChild($editor);

  $editor.innerHTML = `
      <input type="text" placeholder="Untitled" name="title" />
      <textarea name="content"></textarea>
  `;

  /* 
    {
      post: {}
    }
  */
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").innerHTML = this.state.content;
  };

  $editor.addEventListener("keyup", (e) => {
    const { target } = e;
    const name = target.getAttribute("name");
    const nextState = { ...this.state, [name]: e.target.value };

    this.setState(nextState);
    onEditing(this.state);
  });
}
