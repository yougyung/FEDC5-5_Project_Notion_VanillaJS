import RootPage from '../Page/RootPage.js';
import Router from '../Util/router.js';

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
        const router = Router.getInstance();

        router.setPages([
            { path: '/index.html', page: this.rootPage },
            { path: '/document', page: null },
        ]);
    }

    setState(nextState) {
        const { currentUser } = nextState;

        this.state = { currentUser };
        this.rootPage.setState(nextState);
    }
}
