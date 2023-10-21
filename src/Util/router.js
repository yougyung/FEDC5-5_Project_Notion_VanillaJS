import RootPage from '../Page/RootPage.js';
import EditPage from '../Page/EditPage.js';

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

        this.init();
    }

    init() {
        window.onpopstate = () => this.route();
    }

    changeUrl(url) {
        history.pushState(null, null, url);
        this.route();
    }

    route() {
        const $target = document.querySelector('#app');
        const { pathname } = window.location;

        $target.replaceChildren();

        if (pathname === '/index.html' || pathname === '/') {
            const rootPage = new RootPage({ $target });

            rootPage.init();
        } else if (pathname.indexOf('/document') === 0) {
            const documentId = pathname.split('/')[2];
            const page = new EditPage({ $target, initalState: { documentId } });

            page.init();
        } else {
            const rootPage = new RootPage({ $target });

            rootPage.init();
        }
    }
}
