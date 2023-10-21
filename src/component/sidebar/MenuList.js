import request from "../../api.js";
import MenuItem from "./MenuItem.js";

export default class MenuList {

    arr = [];

    constructor(sidebar) {
        this.sidebar = sidebar;
        this.init()

    }

    async init() {
        this.menulist = await request("/documents");
        this.menulist.map((menuItem) => {
            this.arr.push(new MenuItem(menuItem, 0));
        });
        this.render();
    }

    render() {
        this.sidebar.innerHTML = `
        <div>
            ${this.arr.map((menuItem) => (menuItem.render())).join('')} 
        </div>`
        console.log(this.sidebar.innerHTML);
    }
}

