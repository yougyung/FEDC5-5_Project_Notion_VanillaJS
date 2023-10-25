import request from "../../api.js";

export default class Board {

    constructor(rootElement) {

        this.editorElement = document.createElement('div');
        this.editorElement.setAttribute("contenteditable", "true");
        rootElement.appendChild(this.editorElement);
    }
    setDocuments(id) {
        this.id = id;
        this.loadDocument();
    }

    async loadDocument() {
        const req = await request(`/documents/${this.id}`, { method: `GET` });
        this.title = req.title;
        this.content = req.content;
        this.editorElement.innerHTML = this.content
        this.editorElement.addEventListener("input", (e) => {
            const textHtml = e.target.innerHTML;
            const startIndex = textHtml.indexOf('<div>');
            const title = startIndex === -1 ? e.target.innerHTML : textHtml.substring(0, startIndex);
            const textContent = textHtml.replaceAll(/<div>/g, "<br>").replaceAll(/<\/div>/g, "")
            this.updateDocument(title, textContent);
        });
    }
    async updateDocument(title, content) {
        await request(`/documents/${this.id}`, {
            method: `PUT`,
            body: JSON.stringify({
                "title": title,
                "content": content
            })
        });
    }
}