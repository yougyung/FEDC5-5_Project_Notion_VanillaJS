import Sidebar from "./component/sidebar/Sidebar.js";
import Board from "./component/main/board.js";

const rootElement = document.querySelector('#app');

const sidebar = new Sidebar({
    rootElement,
    onEvent: (id) => {
        board.setDocuments(id);
    }
});
const board = new Board({
    rootElement,
    onChangeTitle: (id, title) => {
        sidebar.menuList.updateDocumentTitle(id, title);
    }
});