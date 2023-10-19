import User from './User/user.js';
import Document from './Document/document.js';
import { createNewElement } from '../../Util/element.js';
import { USER_LIST_KEY, getItem } from '../../Store/localStroage.js';

// state = { currentUser : "..." }

export default class Sidebar {
    constructor({ $target, initalState, setUser }) {
        this.$target = $target;
        this.state = initalState;
        this.setUser = setUser;

        this.init();
    }

    init() {
        this.render();
    }

    render() {
        const $userAndDocument = createNewElement('div', [{ property: 'className', value: 'user-and-document' }]);
        const { currentUser } = this.state;
        const userList = getItem(USER_LIST_KEY, []);

        this.$target.appendChild($userAndDocument);
        this.user = new User({
            $target: $userAndDocument,
            initalState: { currentUser, userList },
            setUser: this.setUser,
        });
        this.document = new Document({
            $target: $userAndDocument,
            initalState: { currentUser, documentList: [] },
        });
    }

    setState(nextState) {
        const { currentUser, userList } = nextState;

        this.state = { userList };
        this.user.setState(nextState); // user 컴포넌트에서 사용중인 사용자와, 사용자 목룍 state가 필요
        this.document.setState({ currentUser }); // documnet 컴포넌트에서 사용중인 사용자 state가 필요
    }
}
