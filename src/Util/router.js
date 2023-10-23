import RootPage from '../Page/RootPage.js';
import EditPage from '../Page/EditPage.js';
import Sidebar from '../Component/Sidebar/Sidebar.js';
import { createNewElement } from './Element.js';

export default class RouterManger {
    static instance = null;

    static getInstance() {
        if (!RouterManger.instance) {
            RouterManger.instance = new RouterManger();
        }
        return RouterManger.instance;
    }

    constructor() {
        if (RouterManger.instance) {
            return RouterManger.instance;
        }
        this.$target = document.querySelector('#app');

        this.init();
    }

    init() {
        new Sidebar({ $target: this.$target });
        window.onpopstate = () => this.route();
    }

    changeUrl(url) {
        history.pushState(null, null, url);
        this.route();
    }

    route() {
        const { pathname } = window.location;
        const $last = this.$target.lastElementChild;

        if ($last.className !== 'sidebar') {
            this.$target.removeChild($last);
        }

        if (pathname === '/index.html' || pathname === '/') {
            new RootPage({ $target: this.$target });
        } else if (pathname.indexOf('/document') === 0) {
            const documentId = pathname.split('/')[2];
            new EditPage({ $target: this.$target, initalState: { documentId } });
        } else {
            new RootPage({ $target: this.$target });
        }
    }
}
