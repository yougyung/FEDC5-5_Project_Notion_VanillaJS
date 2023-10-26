import request from "../../api.js";

import DocumentList from "./DocumentList.js";
import DocumentItem from "./DocumentItem.js";
import { addDocumentButton, serachButton, sidebarHeader } from "./DocumentOptions.js"

export default class Sidebar {
    constructor({ rootElement, onEvent }) {
        const sidebarElement = document.createElement('div');
        sidebarElement.className = "sidebar";
        onEvent = onEvent.bind(this);
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
                    this.documentList.arr.push(new DocumentItem({ id, title, documents: [] }, this.documentList.documentListElement, onEvent));
                })
            }
        });

        rootElement.appendChild(sidebarElement);
        sidebarElement.appendChild(headerElement);
        sidebarElement.appendChild(searchButtonElement);
        this.documentList = new DocumentList(sidebarElement, onEvent);
        sidebarElement.appendChild(addDocumentButtonElement);
    }
}
