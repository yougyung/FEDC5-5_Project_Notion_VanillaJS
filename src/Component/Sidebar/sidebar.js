import Header from './Header/Header.js';
import Document from './Document/Document.js';
import { getUserName } from '../../Util/userName.js';
import { createNewElement } from '../../Util/Element.js';

export default class Sidebar {
    constructor({ $target }) {
        this.$target = $target;

        this.init();
    }

    init() {
        const $sidebar = createNewElement('div', [{ property: 'className', value: 'sidebar' }]);
        const userName = getUserName();

        this.user = new Header({
            $target: $sidebar,
            userName,
        });
        this.document = new Document({
            $target: $sidebar,
        });

        this.$target.appendChild($sidebar);
    }
}
