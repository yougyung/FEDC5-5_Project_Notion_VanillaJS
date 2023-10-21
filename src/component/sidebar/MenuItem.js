export default class MenuItem {

    arr = [];

    constructor(item, depth) {
        this.item = item;
        this.isSlotOpen = false;
        item.documents.map((menuItem) => {
            this.arr.push(new MenuItem(menuItem, depth + 1));

        });
    }

    render() {
        return (
            `
            <div>
                <p>${this.item.title}</p>
                ${this.arr.length ? this.arr.map((menuItem) => (menuItem.render())).join('') : ""}
            </div>`);
    }
}

