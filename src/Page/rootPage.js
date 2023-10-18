import UserAndDocument from '../Component/UserAndDocument/UserAndDocument.js';
import { createNewElement } from '../Util/element.js';

// state = { currentUser : "..." }

export default class RootPage {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;
        this.$page = createNewElement("div", [{ property: "className", value: "wrap" }]);
        this.userAndDocument = null; 
    
        this.init();
    }

    init() {

    }

    render() {
        this.$target.appendChild(this.$page);
        this.userAndDocument = new UserAndDocument({ $target: this.$page, initalState: this.state });
    }

    setState(nextState) {
        this.state = nextState;
        this.userAndDocument.setState(nextState);
    }
}
