export default function Editor({ $target, initialState, onEdit }) {
  const $editor = document.createElement("section");
  $editor.className = "editor";

  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  $editor.innerHTML = `
  <h1 name="title" class="title" type="text" placeholder="제목 없음" contentEditable="true"></h1>
  <div name="content" class="content" placeholder="빈 페이지" contentEditable="true"></div>
`;

  this.render = () => {
    const { title, content } = this.state;

    $editor.querySelector("[name=title]").textContent = title;
    $editor.querySelector("[name=content]").textContent = content;
  };

  $editor.addEventListener("input", (event) => {
    const { target } = event;
    const name = target.getAttribute("name");

    if (this.state[name] !== undefined) {
      const nextState = { ...this.state, [name]: target.textContent };

      this.setState(nextState);
      onEdit(this.state);
    }
  });

  this.render();
}
