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
        this.rootPage.render();
    }

    setState(nextState) {
        const { currentUser } = nextState;

        this.state = { currentUser };
        this.rootPage.setState(nextState);
    }
}
