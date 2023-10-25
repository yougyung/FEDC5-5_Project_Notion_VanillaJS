import MenuList from "./MenuList.js";
import request from "../../api.js";

export default class Sidebar {
    constructor({ rootElement, onEvent }) {
        const sidebarElement = document.createElement('div');
        this.menuList = new MenuList(sidebarElement, onEvent);
        rootElement.appendChild(sidebarElement);
    }
}