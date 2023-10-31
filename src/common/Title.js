export default function Title({ $target, initialState }) {
  // state = {title, href}
  const $title = document.createElement("a");
  this.state = initialState;
  $target.appendChild($title);
  $title.setAttribute("href", this.state.href);
  $title.classList.add("title");
  this.render = () => {
    $title.textContent = this.state.title;
  };
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  $title.addEventListener("click", (e) => {
    e.preventDefault();
  });
  this.render();
}
