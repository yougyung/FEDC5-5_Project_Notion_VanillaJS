export default function SidebarFooter({ $target, setState }) {
  const $sidebarFooter = document.createElement("div");
  $target.appendChild($sidebarFooter);
  $sidebarFooter.className = "sidebar-footer";

  this.render = () => {
    $sidebarFooter.textContent = `+ 페이지 추가`;
  };

  this.render();
}
