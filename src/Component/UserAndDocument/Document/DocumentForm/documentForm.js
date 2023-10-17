import { createNewElement } from '../../../../Util/element.js';

export default class DocumentForm {
    constructor({ $target }) {
        this.$target = $target;
        this.$documentForm = createNewElement("div", [{ property: "className", value: "title-and-button"}]);

        this.init();
    }

    init() {
        const $title = createNewElement("span", [{ property: "className", value: "title-and-button__title" }], "Document");
        const $button = createNewElement("button", [{ property: "className", value: "title-and-button__button" }], "+");

        this.$documentForm.appendChild($title);
        this.$documentForm.appendChild($button);
        this.$target.appendChild(this.$documentForm);
    }
}
