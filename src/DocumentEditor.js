export default function DocumentEditor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");

  this.state = initialState;

  let isinitialize = false;
  $target.appendChild($editor);
  this.setState = (nextState) => {
    this.state = nextState;

    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").value = this.state.content;
    this.render();
  };

  this.render = () => {
    if (!isinitialize) {
      $editor.innerHTML = `
            <input type="text" name="title" style="display:block;width:600px;" value=${this.state.title}>
            <textarea name="content" style="display:block;width:600px;height:400px;border:1px solid black;padding:8px">${this.state.content}</textarea>
          `;
      isinitialize = true;
    }
  };

  this.render();

  $editor.addEventListener("keyup", (e) => {
    const { target } = e;
    const name = target.getAttribute("name");
    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: target.value,
      };
      this.setState(nextState);
      onEditing(this.state);
    }
  });
}
