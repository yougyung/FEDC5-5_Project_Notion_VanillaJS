export default function Header({ $target, title }) {
  const $h1 = document.createElement("h1");
  $target.appendChild($h1);

  this.render = () => {
    $h1.innerText = `${title}`;
  };

  this.render();
}
