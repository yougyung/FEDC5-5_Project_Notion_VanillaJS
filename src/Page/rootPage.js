import { createNewElement } from '../Util/Element.js';

export default class RootPage {
    constructor({ $target }) {
        this.$target = $target;

        this.init();
    }

    init() {
        const $page = createNewElement('div', [{ property: 'className', value: 'root-wrap' }], 'Notion');

        this.$target.appendChild($page);
    }
}
