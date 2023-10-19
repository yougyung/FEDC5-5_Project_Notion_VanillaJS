import { USER_LIST_KEY, setItem } from '../../../../Store/localStroage.js';
import { createNewElement } from '../../../../Util/element.js';

// state = { currentUser: "...", userList: [] }

export default class UserList {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;
        this.$ul = createNewElement("ul", [{ property: "className", value: "user-items" }]);

        this.init();
    }

    init(){
        this.$target.appendChild(this.$ul);
        this.render();
    }

    render() {
        const { currentUser, userList } = this.state;
        const $fragment = document.createDocumentFragment();

        this.$ul.replaceChildren();

        userList?.forEach(userName => {
            const $li = createNewElement("li", [{ property: "className", value: `${currentUser === userName ? "user-item--current" : "user-item"}`}, { property: "dataset.name", value: userName }]);
            const $name = createNewElement("span", [{ property: "className", value: "user-item__name" }], userName);
            const $delete = createNewElement("button", [{ property: "className", value: "user-item__button" }], "-");

            $li.appendChild($name);
            $li.appendChild($delete);
            $fragment.appendChild($li);
        });

        this.$ul.appendChild($fragment);
    }

    setState(nextState) {
        console.log(nextState)
        setItem(USER_LIST_KEY, nextState.userList);
        this.state = nextState;
        this.render();
    }
}
