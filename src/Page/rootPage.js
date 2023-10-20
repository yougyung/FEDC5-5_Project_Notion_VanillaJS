import SideBar from '../Component/Sidebar/sidebar.js';
import { createNewElement } from '../Util/element.js';

export default class RootPage {
    constructor({ $target }) {
        this.$target = $target;
    }

    render() {
        const $page = createNewElement('div', [{ property: 'className', value: 'wrap' }]);

        this.sideBar = new SideBar({ $target: $page });
        this.$target.appendChild($page);
    }
}
