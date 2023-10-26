export default function Title({ $target }) {
  const $title = document.createElement("div");
  $target.appendChild($title);

  this.render = () => {
    $title.innerHTML = `
      <span class='Title'>Notion</span>
      `;
  };

  this.render();
}
