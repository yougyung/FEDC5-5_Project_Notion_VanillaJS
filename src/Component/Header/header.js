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

        this.$header.appendChild($userName);
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

        $userName.innerText = `${userName}님`;
    }
}
