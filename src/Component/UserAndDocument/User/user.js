import { createNewElement } from '../../../Util/element.js';
import UserForm from './UserForm/userForm.js';

// state = { currentUser : "..." }

export default class User {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;
        this.$user = createNewElement("div", [{ property: "className", value: "user" }]);
        this.userForm = new UserForm({ $target: this.$user, initalState: { currentUser: this.state.currentUser }});

        this.init();
    }

    init() {
        this.$target.appendChild(this.$user);
    }

    setState(nextState) {
        this.state = nextState;
        this.userForm.setState(nextState);
    }
}
