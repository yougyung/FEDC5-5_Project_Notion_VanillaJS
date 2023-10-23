export default function Posting({ $target, initialState }) {
  const $section = document.createElement("section");
  $section.className = "edit";
  $target.appendChild($section);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    const { title, content } = this.state;
    $section.innerHTML = `<input value="${title}"/>
    <textarea>${content ? content : ""}</textarea>`;
    document.getElementsByTagName("input")[0].focus();
  };
}
