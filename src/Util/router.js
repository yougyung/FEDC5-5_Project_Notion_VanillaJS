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
        const { pathname } = window.location;

        if (pathname === '/index.html' || pathname === '/') {
            const { page } = this.pages.find(({ path }) => path === pathname);

            page.render();
        } else if (pathname.indexOf('/document') === 0) {
            const { page } = this.pages.find(({ path }) => path === '/document');
            const documentId = pathname.split('/')[2];

            console.log(documentId, page);
        } else {
            alert('404 ERROR!');
        }
    }
}
