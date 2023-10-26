import request from "../../api.js";
import MenuItem from "./MenuItem.js";

export default class MenuList {

    arr = [];

    constructor(sidebarElement, onEvent) {
        this.menuListElement = document.createElement('ul');
        this.menuListElement.className = "parentPageList";
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
    updateDocumentTitle(id, title) {
        const findNode = () => {
            const queue = [...this.arr];
            while (queue.length) {
                const nowNode = queue.shift();
                if (nowNode.item.id === id) {
                    return nowNode;
                }
                nowNode.arr.map((documentItem) => {
                    queue.unshift(documentItem);
                });
            }
            return null;
        };
        const node = findNode();
        node.documentNameLabelElement.textContent = title;
    }
}

