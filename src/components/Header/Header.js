import style from "./header.module.css";

export default function Header({ $target, initialState = [] }) {
  const $header = document.createElement("div");
  $header.className = style.header;

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $header.innerHTML = `${this.state.map(page => `<p>${page}</p>`).join("")}`;
    $target.appendChild($header);
  };

  $header.addEventListener("click", e => {
    const $tab = e.target.closest("p");
    console.log($tab);
  });

  this.render();
}
