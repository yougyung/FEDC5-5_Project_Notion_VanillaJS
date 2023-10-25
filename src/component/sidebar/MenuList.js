import request from "../../api.js";
import MenuItem from "./MenuItem.js";

export default class MenuList {

    arr = [];

    constructor(sidebarElement, onEvent) {
        this.menuListElement = document.createElement('ul');
        sidebarElement.appendChild(this.menuListElement);
        this.onEvent = onEvent;
        this.init();
    }
    async init() {
        this.menulist = await request("/documents");
        this.menulist.map((menuItem) => {
            this.arr.push(new MenuItem(menuItem, this.menuListElement, this.onEvent));
        });
    }
}

