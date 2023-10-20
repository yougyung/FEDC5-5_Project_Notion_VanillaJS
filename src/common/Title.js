export default function Title({ $target, initialState, onTitleClick }) {
  // state = {title, id}
  const $title = document.createElement("a");
  this.state = initialState;
  $target.appendChild($title);
  $title.setAttribute("herf", this.state.id);
  $title.classList.add("title");
  this.render = () => {
    $title.textContent = `${this.state.title}`;
  };
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  $title.addEventListener("click", (e) => {
    e.preventDefault();
    //onTitleClick(e);
  });
}
