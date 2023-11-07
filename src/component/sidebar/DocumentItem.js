import request from "../../api.js";


const SLOTOPEN_PNG_SRC = "/public/slotopen.png";
const SLOTCLOES_PNG_SRC = "/public/slotclose.png";

export default class DocumentItem {

    documentItemList = [];

    constructor(item, parentElement, onSetPage, onDeleteItem) {
        this.item = item;
        this.isSlotOpen = false;

        if (onDeleteItem) this.onDeleteItem = onDeleteItem.bind(this);
        if (onSetPage) this.onSetPage = onSetPage.bind(this);

        this.parentElement = parentElement;
        this.parentListElement = document.createElement('li');
        this.slotButtonElement = document.createElement('button');
        this.slotImgElement = document.createElement('img');
        this.documentNameLabelElement = document.createElement('label');
        this.childListElement = document.createElement('ul');

        const addButtonElement = document.createElement('button');
        const deleteButtonElement = document.createElement('button');

        parentElement.appendChild(this.parentListElement);
        this.parentListElement.appendChild(this.slotButtonElement);
        this.parentListElement.appendChild(this.documentNameLabelElement);
        this.parentListElement.appendChild(addButtonElement);
        this.parentListElement.appendChild(deleteButtonElement);
        this.parentListElement.appendChild(this.childListElement);
        this.slotButtonElement.appendChild(this.slotImgElement);

        this.parentListElement.setAttribute("titlename", this.item.title);
        this.parentListElement.id = "l" + this.item.id;
        this.documentNameLabelElement.textContent = this.item.title;
        this.parentListElement.className = "childPageList";
        this.documentNameLabelElement.id = `documentbtn${item.id}`;
        this.slotImgElement.className = `slotbtn`;
        this.slotImgElement.id = `slotbtn${item.id}`;
        deleteButtonElement.id = `deletebtn${item.id}`;
        this.childListElement.style.display = "none";
        addButtonElement.id = `addbtn${item.id}`
        addButtonElement.textContent = "+";
        deleteButtonElement.textContent = "x";

        item.documents.map((documentItem) => {
            this.documentItemList.push(new DocumentItem(documentItem, this.childListElement, this.onSetPage, this.onDeleteItem));
        });
        this.setEvent(addButtonElement, deleteButtonElement, parentElement);
        this.render();
    }

    render() {
        this.slotImgElement.src = this.isSlotOpen ? SLOTOPEN_PNG_SRC : SLOTCLOES_PNG_SRC;
        this.isSlotOpen ? this.childListElement.style.display = "block" : this.childListElement.style.display = "none";
    };


    setEvent(addButtonElement, deleteButtonElement, parentElement) {
        this.documentNameLabelElement.addEventListener('click', (event) => {
            if (event.target.id === "documentbtn" + this.item.id) {
                this.onSetPage(this.item.id);
            }
        });
        this.slotButtonElement.addEventListener('click', (event) => {
            if (event.target.id === "slotbtn" + this.item.id) {
                this.isSlotOpen = !this.isSlotOpen;
                this.render();
            }
        });
        addButtonElement.addEventListener('click', async (event) => {
            if (event.target.id === "addbtn" + this.item.id) {
                const req = request("/documents", {
                    method: `POST`,
                    body: JSON.stringify({
                        "title": "제목 없음",
                        "parent": this.item.id
                    })
                }).then(({ id, title }) => {
                    this.documentItemList.push(new DocumentItem({ id, title, documents: [] }, this.childListElement, this.onSetPage, this.onDeleteItem));
                })
            }
        });
        deleteButtonElement.addEventListener('click', (event) => {
            if (event.target.id === "deletebtn" + this.item.id) {
                this.onDeleteItem();
                const dfs = (node) => {
                    node.documents.map((documentItem) => {
                        dfs(documentItem);
                    });
                    request(`/documents/${node.id}`, {
                        method: `DELETE`
                    });
                };
                dfs(this.item);
            }
            parentElement.removeChild(this.parentListElement);
        });
    }
}