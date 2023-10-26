import Sidebar from "./component/sidebar/Sidebar.js";
import Page from "./component/main/Page.js";

const rootElement = document.querySelector('#app');

const sidebar = new Sidebar({
    rootElement,
    onEvent: (id) => {
        page.setDocument(id);
    }
});
const page = new Page({
    rootElement,
    onChangeTitle: (id, title) => {
        sidebar.menuList.updateDocumentTitle(id, title);
    }
});