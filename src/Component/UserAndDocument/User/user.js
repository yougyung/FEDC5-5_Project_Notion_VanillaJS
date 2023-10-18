import { createNewElement } from '../../../Util/element.js';
import UserForm from './UserForm/userForm.js';

// state = { currentUser : "..." }

export default class User {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;
        this.$user = createNewElement("div", [{ property: "className", value: "user" }]);
        this.userForm = null;

        this.init();
    }

    init() {
        this.render();
    }

    render() {
        this.$target.appendChild(this.$user);
        this.userForm = new UserForm({ $target: this.$user, initalState: this.state });
    }

    setState(nextState) {
        this.state = nextState;
        this.userForm.setState(nextState);
    }
}
