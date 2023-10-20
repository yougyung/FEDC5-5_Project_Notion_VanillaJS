import RootPage from '../Page/RootPage.js';
import Router from '../Util/router.js';
import Observer from '../Store/userObserver.js';

export default class App {
    constructor({ $target }) {
        this.$target = $target;
        this.rootPage = new RootPage({ $target });

        this.init();
    }

    init() {
        const router = Router.getInstance();
        Observer.getInstance();

        router.setPages([
            { path: '/index.html', page: this.rootPage },
            { path: '/document', page: null },
        ]);
    }
}
