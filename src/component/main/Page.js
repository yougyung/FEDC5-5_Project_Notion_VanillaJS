import Editor from "./Editor.js";
import PageTitle from "./PageTitle.js";

export default class Page {

    constructor({ rootElement, onChangeTitle }) {
        const pageElement = document.createElement('div');
        pageElement.className = "page";
        this.PageTitle = new PageTitle(pageElement);
        this.editor = new Editor({ pageElement, onChangeTitle });
        rootElement.appendChild(pageElement);
    }

    setDocument(id) {
        this.id = id;
        this.editor.changeDocument(id);
        this.PageTitle.setTitle(id);
    }
}