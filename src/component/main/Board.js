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

            if (findDiv) {
                e.preventDefault();
                const newLine = document.createElement('br');
                this.editorElement.removeChild(findDiv);
                this.editorElement.appendChild(newLine);
            }
            this.convertHeadingTag(textHTML, e);
            this.updateDocument('제목 없음', textHTML);
        });
    }

    convertHeadingTag(textHTML, e) {
        const findH1 = textHTML.split("#&nbsp;");
        const findH2 = textHTML.split("##&nbsp;");
        const findH3 = textHTML.split("###&nbsp;");
        const findH4 = textHTML.split("####&nbsp;");
        const findHeadingTagArr = [findH1, findH2, findH3, findH4];

        findHeadingTagArr.map((item, index) => {
            if (item.length > 1) {
                e.target.innerHTML = item[0] + `<h${index + 1} id="cur">&nbsp;</h${index + 1}>`;
                const selection = window.getSelection();
                const range = document.createRange();
                const HeadingTag = document.getElementById('cur');
                range.selectNode(HeadingTag);
                HeadingTag.id = "";
                selection.removeAllRanges();
                selection.addRange(range);
            }
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