import request from "../../api.js";

export default class MenuItem {

    arr = [];

    constructor(item, parentElement) {
        this.item = item;
        this.isSlotOpen = false;

        this.parentElement = parentElement;
        this.parentListElement = document.createElement('li');
        this.slotButtonElement = document.createElement('button');
        this.documentNameLabelElement = document.createElement('label');
        const addButtonElement = document.createElement('button');
        this.childListElement = document.createElement('ul');

        parentElement.appendChild(this.parentListElement);
        this.parentListElement.appendChild(this.slotButtonElement);
        this.parentListElement.appendChild(this.documentNameLabelElement);
        this.parentListElement.appendChild(addButtonElement);
        this.parentListElement.appendChild(this.childListElement);

        this.parentListElement.id = this.item.id;
        this.documentNameLabelElement.textContent = this.item.title;
        this.documentNameLabelElement.id = `documentbtn${item.id}`
        this.slotButtonElement.id = `slotbtn${item.id}`
        this.slotButtonElement.textContent = this.isSlotOpen ? "^" : ">";
        this.childListElement.style.display = "none";
        addButtonElement.id = `addbtn${item.id}`
        addButtonElement.textContent = "+";

        item.documents.map((menuItem) => {
            this.arr.push(new MenuItem(menuItem, this.childListElement));
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
                    this.arr.push(new MenuItem({ id, title, documents: [] }, this.childListElement));
                })
            }
        });
    }

    render() {
        const slotOpenBtn = this.isSlotOpen ? "^" : ">";
        this.slotButtonElement.textContent = slotOpenBtn;
        this.isSlotOpen ? this.childListElement.style.display = "block" : this.childListElement.style.display = "none";
    };
}