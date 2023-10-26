import Sidebar from "./component/sidebar/Sidebar.js";
import Page from "./component/main/Page.js";
import SearchModal from "./component/modal/searchModal.js";

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
        sidebar.documentList.updateDocumentTitle(id, title);
    }
});

const searchModal = new SearchModal({
    rootElement, setPage: (id) => {
        page.setDocument(id);
    }
});