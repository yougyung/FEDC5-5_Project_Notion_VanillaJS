import request from "../../api.js";

export default class Board {

    constructor({ rootElement, onChangeTitle }) {
        this.onChangeTitle = onChangeTitle.bind(this);
        this.editorElement = document.createElement('form');
        this.editorElement.className = "textEditor";
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
        this.editorElement.innerHTML = this.content;
        this.editorElement.addEventListener("keyup", (e) => {
            const textHTML = e.target.innerHTML;
            const findDiv = this.editorElement.querySelector('div');
            const findH3 = textHTML.split("###&nbsp;");

            if (findDiv) {
                e.preventDefault();
                const newLine = document.createElement('br');
                this.editorElement.removeChild(findDiv);
                this.editorElement.appendChild(newLine);
            }
            if (findH3.length > 1) {
                e.preventDefault();
                e.target.innerHTML = findH3[0] + `<h3 id="cur">&nbsp;</h3>`;
                const selection = window.getSelection();
                const range = document.createRange();
                const h3Node = document.getElementById('cur');
                range.selectNode(h3Node);
                h3Node.id = "";
                selection.removeAllRanges();
                selection.addRange(range);
            }
            console.log(e.target.innerHTML);
            this.updateDocument('제목 없음', textHTML);
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
        if (this.title !== title) {
            this.title = title;
            this.onChangeTitle(this.id, title);
        }
    }
}