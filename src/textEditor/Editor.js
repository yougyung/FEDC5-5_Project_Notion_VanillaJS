export default function Editor({ $target, initialState }) {
  const $editor = document.createElement("section");
  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $editor.innerHTML = `
            <input type="text" placeholder="제목" value="${this.state.title}" />
            <textarea>${this.state.content}</textarea>
        `;
  };

  this.render();
}
