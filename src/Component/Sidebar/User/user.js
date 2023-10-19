import { createNewElement } from '../../../Util/element.js';
import UserForm from './UserForm/userForm.js';
import UserList from './UserList/userList.js';

// state = { currentUser: "...", userList: [] }

export default class User {
    constructor({ $target, initalState, setUser }) {
        this.$target = $target;
        this.state = initalState;
        this.setUser = setUser;
        this.userForm = null;
        this.userList = null;
        this.$user = createNewElement('div', [{ property: 'className', value: 'user' }]);

        this.init();
    }

    init() {
        this.$user.addEventListener('click', (e) => this.handleOnClick(e));
        this.$user.addEventListener('submit', (e) => this.handleOnSubmit(e));
        this.render();
    }

    render() {
        const { currentUser, userList } = this.state;

        this.$target.appendChild(this.$user);
        this.userForm = new UserForm({ $target: this.$user, initalState: { currentUser } });
        this.userList = new UserList({ $target: this.$user, initalState: { currentUser, userList } });
    }

    setState(nextState) {
        const { currentUser, userList } = nextState;

        this.state = { currentUser, userList };
        this.userForm.setState({ currentUser }); // 현재 사용자 state만 필요
        this.userList.setState({ currentUser, userList }); // 현재 사용자, 사용자 목록 state 필요
    }

    handleOnClick(e) {
        const {
            target,
            target: { className },
        } = e;

        // 사용자 변경 (현재 사용자는 클래스 명이 다르다)
        if (className === 'user-item__name') {
            const { innerText } = target;

            if (this.state.currentUser !== innerText) {
                this.setUser({ ...this.state, currentUser: innerText });
            }
        }

        // 사용자 삭제
        if (className === 'user-item__button') {
            const { currentUser, userList } = this.state;
            const name = target.closest('.user-item, .user-item--current').dataset.name;
            const newUserList = userList.filter((userName) => userName !== name);

            // 현재 사용자를 삭제한다면
            if (name === currentUser) {
                this.setUser({ currentUser: null, userList: newUserList });
            } else {
                this.setState({ currentUser, userList: newUserList });
            }
        }
    }

    handleOnSubmit(e) {
        e.preventDefault();
        const {
            target,
            target: { className },
        } = e;

        // 사용자 추가
        if (className === 'user-form') {
            const { currentUser, userList } = this.state;
            const name = target.name.value;

            if (name.length > 10) {
                return alert('10자 이내로 작성해주세요.');
            }
            if (!name) {
                return alert('이름을 입력해주세요.');
            }
            if (this.state.userList.includes(name)) {
                return alert('이미 등록된 사용자입니다.');
            }

            target.name.value = '';
            target.name.focus();
            this.setState({ currentUser, userList: [...userList, name] });
        }
    }
}
