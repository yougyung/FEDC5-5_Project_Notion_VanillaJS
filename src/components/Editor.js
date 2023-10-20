export default function Editor({ $target, initialState = { title: "", content: "" }, onEditing }) {
  const $editor = document.createElement("div");
  $editor.innerHTML = `
    <input type="text" name="title" class="title" placeholder="" autofocus/></br>
    <textarea name="content" class="content" placeholder=""></textarea>
  `;

  $editor.className = "editor";

  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { title, content } = this.state;

    $editor.querySelector("[name=title]").value = title;
    $editor.querySelector("[name=content").value = content;
  };

  $editor.addEventListener("keyup", (e) => {
    const { target } = e;
    const name = target.getAttribute("name");

    const nextState = { ...this.state, [name]: target.value };
    console.log(nextState);

    this.setState(nextState);
    onEditing(this.state);
  });

  this.render();
}
