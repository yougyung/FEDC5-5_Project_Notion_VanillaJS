import User from './User/user.js';
import Document from './Document/document.js';
import { createNewElement } from '../../Util/element.js';
import { CURRENT_USER_KEY, USER_LIST_KEY, getItem, setItem } from '../../Store/localStroage.js'

// state = { currentUser : "...", userList: [] }

export default class UserAndDocument {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;
        this.user = null;
        this.document = null;

        this.init();
    }

    init() {
        this.render();
    }

    render() {
        const $userAndDocument = createNewElement("div", [{ property: "className", value: "user-and-document" }]);
        const userList = getItem(USER_LIST_KEY, []);
        const currentUser = getItem(CURRENT_USER_KEY, null);

        this.$target.appendChild($userAndDocument);
        this.user = new User({ 
            $target: $userAndDocument, 
            initalState: { currentUser, userList },
            onClickCallback: (nextState) => this.setState(nextState)  
        });
        this.document = new Document({ 
            $target: $userAndDocument, 
            initalState: { currentUser, documentList: [] }
        });
    }

    setState(nextState) {
        const { currentUser } = nextState;

        setItem(CURRENT_USER_KEY, currentUser);
        this.state = nextState;
        this.user.setState(nextState); // user 컴포넌트에서도 사용중인 사용자와, 사용자 목룍 state가 필요
        this.document.setState({ currentUser }); // documnet 컴포넌트에서도 사용중인 사용자 state가 필요
    }
}
