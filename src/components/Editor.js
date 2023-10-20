export default function Editor({ $target, initialState = { title: "", content: "" }, onEditing }) {
  const $editor = document.createElement("div");
  $editor.innerHTML = `
    <input type="text" name="title" style="width: 600px;" class="title" placeholder="" autofocus/>
    <textarea name="content" style="width: 600px; height: 400px;"class="content" placeholder=""></textarea>
  `;

  //$editor.className = "editor";

  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { title, content } = this.state;

    $editor.querySelector("[name=title]").value = title;
    $editor.querySelector("[name=content]").value = content;
  };

  this.render();

  $editor.addEventListener("keyup", (e) => {
    const { target } = e;
    const name = target.getAttribute("name");

    if (this.state[name] != undefined) {
      const nextState = { ...this.state, [name]: target.value };
      this.setState(nextState);
      console.log(nextState);
      onEditing(this.state);
    }
  });
}
