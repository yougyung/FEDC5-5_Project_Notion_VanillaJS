import RootPage from '../Page/RootPage.js';

const username = "Ji In Hyeok";

export default class App {
    constructor({ $target }) {
        this.$target = $target;
        this.rootPage = new RootPage({ $target, username });

        this.init();
    }

    init() {
        this.rootPage.redner();
    }
}
