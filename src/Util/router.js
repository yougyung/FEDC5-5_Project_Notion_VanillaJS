import RootPage from '../Page/RootPage.js';
import EditPage from '../Page/editPage.js';
export default class Router {
    static instance = null;
    pages = [];

    static getInstance() {
        if (!Router.instance) {
            Router.instance = new Router();
        }
        return Router.instance;
    }

    constructor() {
        if (Router.instance) {
            return Router.instance;
        }

        window.onpopstate = () => this.routeUrl();
    }

    setPages(pages) {
        this.pages = pages;
        this.routeUrl();
    }

    changeUrl(url) {
        history.pushState(null, null, url);
        this.routeUrl();
    }

    routeUrl() {
        const $target = document.querySelector('#app');
        const { pathname } = window.location;

        $target.replaceChildren();

        if (pathname === '/index.html' || pathname === '/') {
            const rootPage = new RootPage({ $target });

            rootPage.render();
        } else if (pathname.indexOf('/document') === 0) {
            const documentId = pathname.split('/')[2];
            const editPage = new EditPage({ $target, initalState: { documentId } });

            editPage.render();
        } else {
            alert('404 ERROR!');
        }
    }
}
