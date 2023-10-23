import DocumentManager from '../Component/DocumentManager/DocumentManager.js';
import { createNewElement } from '../Util/Element.js';

// state = { documentId : ""}

export default class EditPage {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;

        this.init();
    }

    init() {
        const $page = createNewElement('div', [{ property: 'className', value: 'wrap' }]);

        this.documentManager = new DocumentManager({
            $target: $page,
            initalState: { ...this.state, isView: true, title: '', content: '' },
        });

        this.$target.appendChild($page);
    }
}
