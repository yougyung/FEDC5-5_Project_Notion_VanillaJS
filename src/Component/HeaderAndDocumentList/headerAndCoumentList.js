import { createNewElement } from '../../Util/element.js';
import Header from '../Header/header.js';

// state = { userName : "..." }

export default class HeaderAndDocumentList {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;
        this.$headerAndDocumentList = createNewElement("div", [{ property: "className", value: "header-documentlist" }]);
        this.header = new Header({ $target: this.$headerAndDocumentList, initalState: { userName: this.state.userName} });

        this.init();
    }

    init() {
        this.$target.appendChild(this.$headerAndDocumentList);
    }

    setState(nextState) {
        this.state = nextState;
        this.header.setState(nextState);
    }
}
