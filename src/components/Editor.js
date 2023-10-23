export default function Editor({ $container, initialState = {} }) {
  const $document = document.createElement("div");
  $document.id = "document";
  $container.appendChild($document);

  this.state = initialState;

  this.setState = (nextState) => {
    if (this.state.id !== nextState.id) {
      this.state = nextState;
      this.render();
      return;
    }
    this.state = nextState;
  };

  this.render = () => {
    $document.innerHTML = `
      <input type="text" name="title" value="${this.state.title}">
      <textarea name="content" placeholder="본문을 입력해주세요">${
        this.state.content ?? ""
      }</textarea>
    `;
  };

  $document.addEventListener("input", (e) => {
    const { name } = e.target;

    this.setState({
      ...this.state,
      [name]: e.target.value,
    });
  });
}
