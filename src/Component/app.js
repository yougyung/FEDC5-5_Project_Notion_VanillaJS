import RootPage from '../Page/RootPage.js';

const userName = "Ji In Hyeok";

export default class App {
    constructor({ $target }) {
        this.$target = $target;
        this.rootPage = new RootPage({ $target, initalState: { userName } });

        this.init();
    }

    init() {
        this.rootPage.init();
    }
}
