export default function Editor({ $target, initialState }) {
  const $editor = document.createElement("div");
  $target.appendChild($editor);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $editor.innerHTML = `
    <div>
        <input type="text" name="title" />
        <textarea name="content"></textarea>
    </div>
    `;

    $editor.querySelector("[name=title]").value = this.state[0].title;
    $editor.querySelector("[name=content]").value = this.state[0].content;
  };
}
