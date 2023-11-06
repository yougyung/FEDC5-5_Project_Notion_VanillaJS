import request from "../../api.js";
import DocumentItem from "./DocumentItem.js";

export default class DocumentList {

    documentItemList = [];

    constructor(sidebarElement, onSetPage, onDeleteItem) {
        this.documentListElement = document.createElement('ul');
        this.documentListElement.className = "parentPageList";
        this.onSetPage = onSetPage;
        this.onDeleteItem = onDeleteItem;

        sidebarElement.appendChild(this.documentListElement);
        this.init();
    }
    async init() {
        this.documentlist = await request("/documents");
        this.documentlist.map((documentitem) => {
            this.documentItemList.push(new DocumentItem(documentitem, this.documentListElement, this.onSetPage, this.onDeleteItem));
        });
    }
    updateDocumentTitle(id, title) {
        const findNode = () => {
            const queue = [...this.documentItemList];
            while (queue.length) {
                const nowNode = queue.shift();
                if (nowNode.item.id === id) {
                    return nowNode;
                }
                nowNode.documentItemList.map((documentItem) => {
                    queue.unshift(documentItem);
                });
            }
            return null;
        };
        const node = findNode();
        if (!node)
            return;

        node.parentListElement.setAttribute("titlename", title);
        node.documentNameLabelElement.textContent = title;
    }
}

