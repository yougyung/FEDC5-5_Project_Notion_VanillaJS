import request from "../../api.js";

import Editor from "./Editor.js";
import PageTitle from "./PageTitle.js";

export default class Page {

    constructor({ rootElement, onChangeTitle }) {
        const pageElement = document.createElement('div');
        pageElement.className = "page";
        this.PageTitle = new PageTitle(pageElement);
        this.editor = new Editor({ pageElement, onChangeTitle });
        rootElement.appendChild(pageElement);

        window.addEventListener('popstate', e => {
            const { pathname } = location;
            const path = pathname.replace(window.location.origin, '');
            const id = path.replace('/documents/', "");
            this.setDocuments(id);
        });
    }

    async setDocument(id) {
        this.id = id;
        this.editor.id = id;
        this.PageTitle.setTitle(id);

        const { title, content } = await request(`/documents/${this.id}`, { method: `GET` });
        this.editor.titleEditorElement.textContent = title;
        this.editor.editorElement.innerHTML = content;

        const path = `/documents/${this.id}`;
        history.pushState(null, null, path);
    }

    showNotDataPage() {

    }
}