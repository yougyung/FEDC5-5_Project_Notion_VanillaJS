export default function Posting({ $target, initialState }) {
  const $section = document.createElement("section");
  $target.appendChild($section);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    const { title, content } = this.state;
    $section.innerHTML = `<h2>${title}</h2><textarea>${
      content ? content : ""
    }</textarea>`;
  };
}
