export default function DocumentEditor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");

  this.state = initialState;

  $editor.innerHTML = `
            <div class="editorDiv" >
              <div contenteditable="true" name="title" placeholder="제목 없음">${
                "### " + this.state.title
              }</div>
              <div contenteditable="true" name="content" style="display:block;width:600px;height:400px;padding:8px">${
                this.state.content
              }</div>
            </div>
          `;

  let isinitialize = false;
  $target.appendChild($editor);
  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector("[name=title]").innerHTML = this.state.title;
    $editor.querySelector("[name=content]").innerHTML = this.state.content;
  };

  this.render = () => {};

  this.render();

  $editor.addEventListener("input", (e) => {
    const { target } = e;
    const name = target.getAttribute("name");
    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: target.innerHTML,
      };
      this.setState(nextState);
      onEditing(this.state);
    }
  });
}
