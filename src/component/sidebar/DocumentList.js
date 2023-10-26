import request from "../../api.js";
import DocumentItem from "./DocumentItem.js";

export default class DocumentList {

    arr = [];

    constructor(sidebarElement, onEvent, onDeleteItem) {
        this.documentListElement = document.createElement('ul');
        this.documentListElement.className = "parentPageList";
        sidebarElement.appendChild(this.documentListElement);
        this.onEvent = onEvent;
        this.onDeleteItem = onDeleteItem;
        this.init();
    }
    async init() {
        this.documentlist = await request("/documents");
        this.documentlist.map((documentitem) => {
            this.arr.push(new DocumentItem(documentitem, this.documentListElement, this.onEvent, this.onDeleteItem));
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

