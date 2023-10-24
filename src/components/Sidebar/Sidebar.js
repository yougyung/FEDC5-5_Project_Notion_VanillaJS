import SidebarList from "./SidebarList.js";
import { request } from "../../utils/api.js";

export default function Sidebar({ $target }) {
  const $sidebar = document.createElement("div");

  //$target.appendChild($sidebar);

  const sidebarList = new SidebarList({});
}
