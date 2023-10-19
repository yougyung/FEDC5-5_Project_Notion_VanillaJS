import { createNewElement } from '../../../../Util/element.js';
import DocumentItems from './DocumentItems/documentItems.js';

// state = { currentUser : "...", documentList: [] }
export default class DocumentList {
    constructor({ $target, initalState, onClickPost, onClickDelete }) {
        this.$target = $target;
        this.state = initalState;
        this.onClickPost = onClickPost;
        this.onClickDelete = onClickDelete;
        this.$documentDiv = createNewElement("div", [{ property: "className", value: "document-list" }]);

        this.init();
    }

    init() {
        this.$documentDiv.addEventListener("click", (e) => this.handleOnClick(e));
        this.$target.appendChild(this.$documentDiv);
        this.render();
    }

    render() {
        const { documentList } = this.state;

        this.$documentDiv.replaceChildren();
        new DocumentItems({ $target: this.$documentDiv, initalState: { documentList, isRoot: true }});
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    handleOnClick(e) {
        const { target, target: { className } } = e;

        // document 추가 이벤트
        if(className === "document__buttons--insert") {
            const currentId = target.closest(".document__item").dataset.id;

            this.onClickPost(currentId);
        }

        // document 삭제 이벤트
        if(className === "document__buttons--delete") {
            const currentId = target.closest(".document__item").dataset.id;

            this.onClickDelete(currentId);
        }
    }
}
