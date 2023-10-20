import { USER_LIST_KEY, setItem } from '../../../../Store/localStroage.js';
import { createNewElement } from '../../../../Util/element.js';
import Observer from '../../../../Store/userObserver.js';

// state = { userList: [] }

export default class UserList {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;
        this.$ul = createNewElement('ul', [{ property: 'className', value: 'user-items' }]);

        this.init();
    }

    init() {
        Observer.getInstance().subscribe((currentUser) => this.render());
        this.$ul.addEventListener('click', (e) => this.handleOnClick(e));
        this.$target.appendChild(this.$ul);
        this.render();
    }

    render() {
        const currentUser = Observer.getInstance().getState();
        const { userList } = this.state;
        const $fragment = document.createDocumentFragment();

        this.$ul.replaceChildren();

        userList?.forEach((userName) => {
            const $li = createNewElement('li', [
                { property: 'className', value: `${currentUser === userName ? 'user-item--current' : 'user-item'}` },
                { property: 'dataset.name', value: userName },
            ]);
            const $name = createNewElement('span', [{ property: 'className', value: 'user-item__name' }], userName);
            const $delete = createNewElement('button', [{ property: 'className', value: 'user-item__button' }], '-');

            $li.appendChild($name);
            $li.appendChild($delete);
            $fragment.appendChild($li);
        });

        this.$ul.appendChild($fragment);
    }

    setState(nextState) {
        setItem(USER_LIST_KEY, nextState.userList);
        this.state = nextState;
        this.render();
    }

    handleOnClick(e) {
        const {
            target,
            target: { className },
        } = e;

        // 사용자 변경
        if (className === 'user-item__name') {
            const { innerText: newUser } = target;
            const currentUser = Observer.getInstance().getState();

            // 다른 사용자를 선택했을 때
            if (currentUser !== newUser) {
                // 구독자들에게 사용자가 변경 되었음을 알린다.
                Observer.getInstance().notifyAll(newUser);
            }
        }

        // 사용자 삭제
        if (className === 'user-item__button') {
            const { userList } = this.state;
            const currentUser = Observer.getInstance().getState();
            const name = target.closest('.user-item, .user-item--current').dataset.name;
            const newUserList = userList.filter((userName) => userName !== name);

            // 현재 사용자를 삭제한다면
            if (name === currentUser) {
                // 구독자들에게 사용자가 변경 되었음을 알린다.
                Observer.getInstance().notifyAll(null);
            }
            this.setState({ userList: newUserList });
        }
    }
}
