export default function Editor({ $target, initialState, onEdit }) {
  const $editor = document.createElement("form");
  $editor.className = "editor";

  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  $editor.innerHTML = `
  <input name="title" class="title" type="text" placeholder="제목 없음" value="${this.state.title ?? ""}" />
  <textarea name="content" class="content" placeholder="빈 페이지">${this.state.content ?? ""}</textarea>
`;

  this.render = () => {
    const { title, content } = this.state;

    $editor.querySelector("[name=title]").value = title;
    $editor.querySelector("[name=content]").value = content;
  };

  $editor.addEventListener("keyup", (event) => {
    const { target } = event;
    const name = target.getAttribute("name");

    if (this.state[name] !== undefined) {
      const nextState = { ...this.state, [name]: target.value };

      this.setState(nextState);
      onEdit(this.state);
    }
  });

  this.render();
}
