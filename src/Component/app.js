import Router from '../Util/router.js';
import Observer from '../Store/userObserver.js';

export default class App {
    constructor() {
        this.init();
    }

    init() {
        Router.getInstance().routeUrl();
        Observer.getInstance();
    }
}
