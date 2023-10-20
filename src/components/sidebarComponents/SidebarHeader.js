export default function SidebarHeader({ $target, username }) {
  const $sidebarHeader = document.createElement("header");
  $target.appendChild($sidebarHeader);

  this.render = () => {
    $sidebarHeader.innerHTML = `<h4>${username}의 Notion</h5>`;
  };

  this.render();
}
