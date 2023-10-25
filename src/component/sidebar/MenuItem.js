export default class MenuItem {

    arr = [];

    constructor(item, parentElement) {
        this.item = item;
        this.isSlotOpen = false;

        this.parentElement = parentElement;
        this.parentListElement = document.createElement('li');
        this.slotButtonElement = document.createElement('button');
        this.documentNameLabelElement = document.createElement('label');
        this.childListElement = document.createElement('ul');


        parentElement.appendChild(this.parentListElement);
        this.parentListElement.appendChild(this.slotButtonElement);
        this.parentListElement.appendChild(this.documentNameLabelElement);
        this.parentListElement.appendChild(this.childListElement);

        this.parentListElement.id = this.item.id;
        this.documentNameLabelElement.textContent = this.item.title;
        this.documentNameLabelElement.id = `documentbtn${item.id}`
        this.slotButtonElement.id = `slotbtn${item.id}`
        this.slotButtonElement.textContent = this.isSlotOpen ? "^" : ">";
        this.childListElement.style.display = "none";

        item.documents.map((menuItem) => {
            this.arr.push(new MenuItem(menuItem, this.childListElement));
        });

        this.slotButtonElement.addEventListener('click', (event) => {
            if (event.target.id === "slotbtn" + this.item.id) {
                this.isSlotOpen = !this.isSlotOpen;
                this.render();
            }
        });
    }

    render() {
        const slotOpenBtn = this.isSlotOpen ? "^" : ">";
        this.slotButtonElement.textContent = slotOpenBtn;
        this.isSlotOpen ? this.childListElement.style.display = "block" : this.childListElement.style.display = "none";
    };
}