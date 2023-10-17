import User from './User/user.js';
import Document from './Document/documnet.js';
import { createNewElement } from '../../Util/element.js';


// state = { currentUser : "..." }

export default class UserAndDocument {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;
        this.$userAndDocument = createNewElement("div", [{ property: "className", value: "user-and-document" }]);
        this.user = new User({ $target: this.$userAndDocument, initalState: { currentUser: this.state.currentUser} });
        this.document = new Document({ $target: this.$userAndDocument, initalState: { currentUser: this.state.currentUser} });

        this.init();
    }

    init() {
        this.$target.appendChild(this.$userAndDocument);
    }

    setState(nextState) {
        this.state = nextState;
        this.user.setState(nextState);
        this.document.setState(nextState);
    }
}
