import request from "../../api.js";

import DocumentList from "./DocumentList.js";
import DocumentItem from "./DocumentItem.js";
import { addDocumentButton, serachButton, sidebarHeader } from "./DocumentOptions.js"

export default class Sidebar {
    constructor({ rootElement, onSetPage, onDeleteItem }) {
        const sidebarElement = document.createElement('div');
        sidebarElement.className = "sidebar";
        const searchButtonElement = serachButton();
        const headerElement = sidebarHeader();
        const addDocumentButtonElement = addDocumentButton({
            onClick: () => {
                request("/documents", {
                    method: `POST`,
                    body: JSON.stringify({
                        "title": "제목 없음",
                        "parent": null
                    })
                }
                ).then(({ id, title }) => {
                    this.documentList.documentItemList.push(new DocumentItem({ id, title, documents: [] }, this.documentList.documentListElement, onSetPage, onDeleteItem));
                })
            }
        });

        rootElement.appendChild(sidebarElement);
        sidebarElement.appendChild(headerElement);
        sidebarElement.appendChild(searchButtonElement);
        this.documentList = new DocumentList(sidebarElement, onSetPage, onDeleteItem);
        sidebarElement.appendChild(addDocumentButtonElement);
    }
}
