import { createNewElement } from '../Util/element.js';
// state = { username : "..." }

export default class Header {
    constructor({ $target, initalState }) {
        this.$header = createNewElement("div", [{ property: "className", value: "header" }]);
        this.$target = $target;
        this.state = initalState;

        this.init();
    }

    init() {

    }
}
