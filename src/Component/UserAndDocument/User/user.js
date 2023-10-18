import { createNewElement } from '../../../Util/element.js';
import UserForm from './UserForm/userForm.js';
import UserList from './UserList/userList.js';

// state = { currentUser: "...", userList: [] }

export default class User {
    constructor({ $target, initalState, onClickCallback }) {
        this.$target = $target;
        this.state = initalState;
        this.onClickCallback = onClickCallback;
        this.userForm = null;
        this.userList = null;
        this.$user = createNewElement("div", [{ property: "className", value: "user" }]);

        this.init();
    }

    init() {
        this.$user.addEventListener("click" , (e) => this.handleOnClick(e));
        this.$user.addEventListener("submit" , (e) => this.handleOnSubmit(e));
        this.render();

    }

    render() {

        this.$target.appendChild(this.$user);
        this.userForm = new UserForm({ $target: this.$user, initalState: { ...this.state } });
        this.userList = new UserList({ $target: this.$user, initalState: { ...this.state } });
    }

    setState(nextState) {
        const { currentUser } = nextState;

        currentUser !== this.state.currentUser && this.userForm.setState({ currentUser }); // 현재 사용자 state만 필요
        this.userList.setState(nextState); // 현재 사용자, 사용자 목록 state 필요
        this.state = nextState;
    }

    handleOnClick(e) {
        const { target, target: { className } } = e;

        // 사용자 변경 (현재 사용자는 클래스 명이 다르다)
        if(className === "user-item__name") {
            const { innerText: currentUser } = target;

            this.onClickCallback({ ...this.state, currentUser });
        }

        // 사용자 삭제
        if(className === "user-item__button") {
            const { currentUser, userList } = this.state;
            const name = target.closest(".user-item").dataset.name;
            const newUserList = userList.filter(userName => userName !== name);

            // 현재 사용자를 삭제한다면
            if(name === this.state.currentUser) {
                this.onClickCallback({ currentUser: null, userList: newUserList });
            }
            else {
                this.onClickCallback({ currentUser, userList: newUserList });
            }
        }
    }

    
    handleOnSubmit(e) {
        e.preventDefault();
        const { target, target: { className } } = e;

        // 사용자 추가
        if(className === "user-form") {
            const { currentUser, userList } = this.state;
            const name = target.name.value;

             // 이름이 비었으면 종료
            if(!name) {
                return alert("이름을 입력해주세요.");
            }
            //  이미 등록되었으면 종료
            if(this.state.userList.includes(name)) {
                return alert("이미 등록된 사용자입니다.")
            }
            
            target.name.value = "";
            target.name.focus();
            this.onClickCallback({ currentUser, userList: [...userList, name] })
        }
        
    }
}
