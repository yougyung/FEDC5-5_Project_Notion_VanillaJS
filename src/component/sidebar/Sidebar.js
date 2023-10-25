import request from "../../api.js";

import MenuList from "./MenuList.js";
import MenuItem from "./MenuItem.js";
import { addDocumentButton, serachButton } from "./MenuOptions.js"

export default class Sidebar {
    constructor({ rootElement, onEvent }) {
        const sidebarElement = document.createElement('div');
        this.menuList = new MenuList(sidebarElement, onEvent);
        onEvent = onEvent.bind(this);
        const searchButtonElement = serachButton();
        const addDocumentButtonElement = new addDocumentButton({
            onClick: () => {
                request("/documents", {
                    method: `POST`,
                    body: JSON.stringify({
                        "title": "제목 없음",
                        "parent": null
                    })
                }
                ).then(({ id, title }) => {
                    this.menuList.arr.push(new MenuItem({ id, title, documents: [] }, this.menuList.menuListElement, onEvent));
                })
            }
        });
        rootElement.appendChild(searchButtonElement);
        rootElement.appendChild(sidebarElement);
        rootElement.appendChild(addDocumentButtonElement);
    }
}
