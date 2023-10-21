import RouterManger from '../Util/Router.js';

export default class App {
    constructor() {
        this.init();
    }

    init() {
        RouterManger.getInstance({}).route();
    }
}
