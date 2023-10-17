import { createNewElement } from '../../../../Util/element.js';

// state = { currentUser : "..." }

export default class UserForm {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;
        this.$nameAndForm = createNewElement("div", [{ property: "className", value: "name-form" }]);

        this.init();
    }

    init() {
        const $name = createNewElement("span", [{ property: "className", value: "name-form__name" }]);
        const $form = createNewElement("form", [{ property: "className", value: "user-form" }]);
        const $input = createNewElement("input", [{ property: "className", value: "user-form__input" }]);
        const $button = createNewElement("button", [{ property: "className", value: "user-form__button" }], "+");

        $form.appendChild($input);
        $form.appendChild($button);
        this.$nameAndForm.appendChild($name);
        this.$nameAndForm.appendChild($form);
        this.$target.appendChild(this.$nameAndForm);
        
        this.render();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        const $name = this.$nameAndForm.querySelector(".name-form__name");
        const { currentUser } = this.state;

        $name.innerText = `${currentUser}님`;
    }
}
