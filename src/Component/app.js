import { initRouter } from '../Util/router.js';
import RootPage from '../Page/RootPage.js';

// state = { currentUser : "..." }

export default class App {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;
        this.rootPage = new RootPage({
            $target,
            initalState: { ...this.state },
            setUser: (nextState) => this.setState(nextState),
        });

        this.init();
    }

    init() {
        initRouter();
        this.router();
    }

    setState(nextState) {
        const { currentUser } = nextState;

        this.state = { currentUser };
        this.rootPage.setState(nextState);
    }

    router() {
        const { pathname } = window.location;

        this.$target.replaceChildren();

        if (pathname === 'index.html' || '/') {
            this.rootPage.render();
        } else if (pathname.includes('/document')) {
            const postId = pathname.split('/')[2];
        } else {
            this.rootPage.render();
        }
    }
}
