import SideBar from '../Component/Sidebar/sidebar.js';
import { createNewElement } from '../Util/Element.js';

export default class RootPage {
    constructor({ $target }) {
        this.$target = $target;
    }

    init() {
        const $page = createNewElement('div', [{ property: 'className', value: 'wrap' }]);

        this.sideBar = new SideBar({ $target: $page });
        this.$target.appendChild($page);
    }
}
