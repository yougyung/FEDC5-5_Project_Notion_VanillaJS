import UserAndDocument from '../Component/UserAndDocument/UserAndDocument.js';
import { createNewElement } from '../Util/element.js';

export default class RootPage {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;
        this.userAndDocument = null; 
    
        this.init();
    }

    init() {

    }

    render() {
        const $page = createNewElement("div", [{ property: "className", value: "wrap" }]);

        this.$target.appendChild($page);
        this.userAndDocument = new UserAndDocument({ $target: $page, initalState: { currentUser: "", userList: [] } });
    }

    setState(nextState) {
        this.state = nextState;
        this.userAndDocument.setState(nextState);
    }
}
