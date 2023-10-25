import MenuList from "./MenuList.js";
import request from "../../api.js";
import { addDocumentButton } from "./MenuOptions.js"


export default class Sidebar {
    constructor({ rootElement, onEvent }) {
        const sidebarElement = document.createElement('div');
        this.menuList = new MenuList(sidebarElement, onEvent);
        const addDocumentButtonElement = new addDocumentButton({
            onClick: () => {
                request("/documents", {
                    method: `POST`,
                    body: JSON.stringify({
                        "title": "제목 없음",
                        "parent": null
                    })
                }
                );
            }
        });

        rootElement.appendChild(sidebarElement);
        rootElement.appendChild(addDocumentButtonElement);
    }
}