export default function SidebarHeader({ $target, username }) {
  const $sidebarHeader = document.createElement("header");
  $target.appendChild($sidebarHeader);

  this.render = () => {
    $sidebarHeader.innerHTML = `<h2>${username}의 Notion</h2>`;
  };

  this.render();
}
