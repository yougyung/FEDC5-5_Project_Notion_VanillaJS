import User from './User/user.js';
import Document from './Document/document.js';
import { createNewElement } from '../../Util/element.js';

export default class Sidebar {
    constructor({ $target }) {
        this.$target = $target;

        this.init();
    }

    init() {
        this.render();
    }

    render() {
        const $userAndDocument = createNewElement('div', [{ property: 'className', value: 'user-and-document' }]);

        this.user = new User({
            $target: $userAndDocument,
        });
        this.document = new Document({
            $target: $userAndDocument,
            initalState: { documentList: [] },
        });
        this.$target.appendChild($userAndDocument);
    }
}
