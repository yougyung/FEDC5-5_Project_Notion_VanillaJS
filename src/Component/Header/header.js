import { createNewElement } from '../../Util/element.js';

// state = { userName : "..." }
export default class Header {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;
        this.$header = createNewElement("div", [{ property: "className", value: "header" }]);

        this.init();
    }

    init() {
        const $userName = createNewElement("span", [{ property: "className", value: "header__user-name" }]);
        const $button = createNewElement("button", [{ property: "className", value: "header__button" }], "+");

        this.$header.appendChild($userName);
        this.$header.appendChild($button);
        this.$target.appendChild(this.$header);

        this.render();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        const $userName = this.$header.querySelector(".header__user-name");
        const { userName } = this.state;

        $userName.innerText = userName;
    }
}
