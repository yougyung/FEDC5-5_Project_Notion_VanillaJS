export default function Editor({ $container }) {
  const $document = document.createElement("div");
  $document.id = "document";
  $container.appendChild($document);

  this.state = {
    title: "hi",
    content: "hello",
  };

  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);
    // this.render();
  };

  this.render = () => {
    $document.innerHTML = `
      <input type="text" name="title" value="${this.state.title}">
      <textarea name="content">${this.state.content}</textarea>
    `;
  };

  $document.addEventListener("input", (e) => {
    const { name } = e.target;

    this.setState({
      ...this.state,
      [name]: e.target.value,
    });
  });

  this.render();
}