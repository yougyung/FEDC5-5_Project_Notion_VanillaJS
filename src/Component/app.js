import RootPage from '../Page/RootPage.js';

const currentUser = "Ji In Hyeok";

export default class App {
    constructor({ $target }) {
        this.$target = $target;
        this.rootPage = new RootPage({ $target, initalState: { currentUser } });

        this.init();
    }

    init() {
        this.rootPage.init();
    }
}
