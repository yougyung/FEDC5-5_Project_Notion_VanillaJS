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
        const $sidebar = createNewElement('aside', [{ property: 'className', value: 'sidebar' }]);

        this.user = new Header({
            $target: $sidebar,
            userName: getUserName(),
        });
        this.document = new Document({
            $target: $sidebar,
        });

        this.$target.appendChild($sidebar);
    }
}
