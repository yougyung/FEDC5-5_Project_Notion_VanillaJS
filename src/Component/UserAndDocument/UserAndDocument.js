import User from './User/user.js';
import Document from './Document/document.js';
import { createNewElement } from '../../Util/element.js';

// state = { currentUser : "..." }

export default class UserAndDocument {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;
        this.$userAndDocument = createNewElement("div", [{ property: "className", value: "user-and-document" }]);
        this.user = null;
        this.document = null;

        this.init();
    }

    init() {
        this.render();
    }

    render() {
        this.$target.appendChild(this.$userAndDocument);
        this.user = new User({ $target: this.$userAndDocument, initalState: this.state });
        this.document = new Document({ $target: this.$userAndDocument, initalState: { ...this.state, documentList: [] }});
    }

    setState(nextState) {
        this.state = nextState;
        this.user.setState(nextState);
        this.document.setState(nextState);
    }
}
