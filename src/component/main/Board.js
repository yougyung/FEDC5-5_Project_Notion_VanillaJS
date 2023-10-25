import request from "../../api.js";

export default class Board {

    constructor(rootElement) {

        this.editorElement = document.createElement('div');
        this.editorElement.setAttribute("contenteditable", "true");
        rootElement.appendChild(this.editorElement);
    }
}