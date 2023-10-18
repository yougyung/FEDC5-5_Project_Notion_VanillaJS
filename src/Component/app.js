import RootPage from '../Page/RootPage.js';

export default class App {
    constructor({ $target }) {
        this.$target = $target;
        this.rootPage = new RootPage({ $target });

        this.init();
    }

    init() {
        this.rootPage.render();
    }
}
