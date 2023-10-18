export default function SideBarHeader({ $target }) {
  const $header = document.createElement("div");
  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = `
    예진's 자체제작 노션
    `;
    $header.style =
      "color: rgb(55, 53, 47); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis";
  };
  this.render();
}
