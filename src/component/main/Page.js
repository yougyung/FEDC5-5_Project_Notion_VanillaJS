import Editor from "./Editor.js";

export default class Page {

    constructor({ rootElement, onChangeTitle }) {
        const pageElement = document.createElement('div');
        this.editor = new Editor({ pageElement, onChangeTitle });

        rootElement.appendChild(pageElement);
    }
}