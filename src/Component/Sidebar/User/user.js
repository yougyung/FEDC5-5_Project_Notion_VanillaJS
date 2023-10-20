import UserForm from './UserForm/userForm.js';
import UserList from './UserList/userList.js';
import { createNewElement } from '../../../Util/element.js';
import { USER_LIST_KEY, getItem } from '../../../Store/localStroage.js';

export default class User {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;
        this.$user = createNewElement('div', [{ property: 'className', value: 'user' }]);

        this.init();
    }

    init() {
        this.render();
    }

    render() {
        this.userForm = new UserForm({
            $target: this.$user,
            onSubmitCallback: (name) => {
                const { userList } = this.userList.state;

                if (userList.includes(name)) {
                    return alert('이미 등록된 사용자입니다.');
                }

                this.userList.setState({ userList: [...userList, name] });
            },
        });
        this.userList = new UserList({
            $target: this.$user,
            initalState: { userList: getItem(USER_LIST_KEY, null) },
        });
        this.$target.appendChild(this.$user);
    }
}
