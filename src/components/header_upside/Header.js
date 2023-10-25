export default function Header({ $target, title }) {
  const $div = document.createElement("div");
  $div.id = "header";
  const $p = document.createElement("p");
  $p.innerText = title;
  $div.appendChild($p);
  $target.appendChild($div);

  // this.render = () => {
  //   $h1.innerText = `${title}`;
  // };

  // this.render();
}
