import Sidebar from '../Component/Sidebar/sidebar.js';
import DocumentManager from '../Component/DocumentManager/documentManager.js';
import { createNewElement } from '../Util/element.js';

// state = { documentId : ""}

export default class EditPage {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;
    }

    render() {
        const $page = createNewElement('div', [{ property: 'className', value: 'wrap' }]);

        this.sideBar = new Sidebar({ $target: $page });
        this.documentManager = new DocumentManager({ $target: $page, initalState: { ...this.state } });
        this.$target.appendChild($page);
    }
}
