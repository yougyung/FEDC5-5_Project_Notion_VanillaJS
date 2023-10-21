import Sidebar from '../Component/Sidebar/Sidebar.js';
import DocumentManager from '../Component/DocumentManager/DocumentManager.js';
import { createNewElement } from '../Util/Element.js';

// state = { documentId : ""}

export default class EditPage {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;
    }

    init() {
        const $page = createNewElement('div', [{ property: 'className', value: 'wrap' }]);

        this.sideBar = new Sidebar({ $target: $page });
        this.documentManager = new DocumentManager({
            $target: $page,
            initalState: { ...this.state, isView: true, title: '', content: '' },
        });
        this.$target.appendChild($page);
    }
}
