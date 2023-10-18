import { createNewElement } from '../../../../Util/element.js';
import { request } from '../../../../Service/document.js';
// state = { currentUser : "..." }

export default class DocumentForm {
    constructor({ $target, initalState, callback }) {
        this.$target = $target;
        this.state = initalState;
        this.callback = callback;
        this.$documentForm = createNewElement("form", [{ property: "className", value: "title-and-form"}]);

        this.init();
    }

    init() {
        this.render();
        this.$documentForm.addEventListener("submit" , (e) => this.handleOnSubmit(e));
    }

    render() {
        const $title = createNewElement("span", [{ property: "className", value: "title-and-form__title" }], "Document");
        const $button = createNewElement("button", [{ property: "className", value: "title-and-form__button" }], "+");
        
        this.$target.appendChild(this.$documentForm);
        this.$documentForm.appendChild($title);
        this.$documentForm.appendChild($button);
    }

    setState(nextState) {
        this.state = nextState;
    }

    handleOnSubmit(e) {
        e.preventDefault();
        const { target: { className } } = e;

        if(className === "title-and-form") {
            const res = this.postDocument();
            
            res && this.callback();
        }
    }

    // document 데이터 추가하기
    async postDocument(title = "문서 제목") {
        const { currentUser } = this.state;
        const res = await request("/documents", currentUser, { method: "POST", body: JSON.stringify({ title, parent: null })});
        
        return res;
    }
}
