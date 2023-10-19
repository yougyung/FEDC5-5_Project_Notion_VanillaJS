import { createNewElement } from '../../../../Util/element.js';
import { CURRENT_USER_KEY, setItem } from '../../../../Store/localStroage.js';

// state = { currentUser: "..." }

export default class UserForm {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;
        this.$nameAndForm = createNewElement("div", [{ property: "className", value: "name-and-form" }]);

        this.init();
    }

    init() {
        const $name = createNewElement("h3", [{ property: "className", value: "name-and-form__name" }]);
        const $form = createNewElement("form", [{ property: "className", value: "user-form" }]);
        const $input = createNewElement("input", [{ property: "className", value: "user-form__input" }, { property: "name", value: "name" }]);
        const $button = createNewElement("button", [{ property: "className", value: "user-form__button" }], "+");

        $form.appendChild($input);
        $form.appendChild($button);
        this.$nameAndForm.appendChild($name);
        this.$nameAndForm.appendChild($form);
        this.$target.appendChild(this.$nameAndForm);

        this.render();
    }

    setState(nextState) {
        setItem(CURRENT_USER_KEY, this.state.currentUser);
        this.state = nextState;
        this.render();
    }

    render() {
        const { currentUser } = this.state;
        const $name = this.$nameAndForm.querySelector(".name-and-form__name");

        $name.innerText = `${currentUser ? `${currentUser}님의 Notion` : "사용자를 등록해주세요"}`;
    }
}
