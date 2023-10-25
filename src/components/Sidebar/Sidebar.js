import SidebarHeader from "./SidebarHeader.js";
import SidebarBody from "./SidebarBody.js";
import SidebarFooter from "./SidebarFooter.js";

export default function Sidebar({ $target }) {
  const $sidebar = document.createElement("div");
  $sidebar.className = "sidebar";

  const sidebarHeader = new SidebarHeader({
    $target: $sidebar,
    setState: this.setState,
  });

  const sidebarBody = new SidebarBody({
    $target: $sidebar,
  });

  const sidebarFooter = new SidebarFooter({
    $target: $sidebar,
    setState: this.setState,
  });

  this.setState = (newState) => {
    sidebarBody.setState(newState);
  };

  this.render = () => {
    $target.appendChild($sidebar);
  };

  this.render();
}
