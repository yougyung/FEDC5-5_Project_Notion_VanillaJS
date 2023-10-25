import MenuList from "./MenuList.js";
import request from "../../api.js";

export default class Sidebar {
    constructor(rootElement) {
        const sidebarElement = document.createElement('div');
        this.menuList = new MenuList(sidebarElement);
        rootElement.appendChild(sidebarElement);
    }
}