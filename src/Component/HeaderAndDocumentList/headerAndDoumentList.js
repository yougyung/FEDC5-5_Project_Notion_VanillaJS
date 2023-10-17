import { createNewElement } from '../../Util/element.js';
import User from '../User/user.js';

// state = { currentUser : "..." }

export default class HeaderAndDocumentList {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;
        this.$headerAndDocumentList = createNewElement("div", [{ property: "className", value: "header-documentlist" }]);
        this.header = new User({ $target: this.$headerAndDocumentList, initalState: { currentUser: this.state.currentUser} });

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
