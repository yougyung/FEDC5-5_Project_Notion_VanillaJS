export default class MenuItem {

    count = 0;
    isSlotOpen = false;
    arr = [];

    constructor(item, depth) {
        this.item = item;
        this.depth = depth;
        item.documents.map((menuItem) => {
            this.arr.push(new MenuItem(menuItem, depth + 1));
        });
        this.render();
    }

    render() {
        const slotOpenBtn = this.isSlotOpen ? "^" : ">";
        let blank = Array(this.depth).fill("&nbsp;&nbsp;&nbsp;").join("");
        return (
            `
            <div>
                <label>${blank}</label>
                <button id="btn${this.item.id}">${slotOpenBtn}</button>
                <label>${this.item.title}</label>
                ${this.arr.length ? this.arr.map((menuItem) => (menuItem.render())).join('') : ""}
            </div>`);
    }

    onEvent() {
        const btn = document.querySelector("#btn" + this.item.id);
        btn.addEventListener('click', () => {
            this.isSlotOpen = !this.isSlotOpen;
            console.log(this.upRender());
        });
    }
}
