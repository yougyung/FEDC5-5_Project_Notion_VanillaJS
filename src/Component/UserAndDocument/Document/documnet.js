import { createNewElement } from '../../../Util/element.js';
import DocumentForm from './DocumentForm/documentForm.js';

// state = { currentUser : "..." }

export default class Document {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;
        this.$document = createNewElement("div", [{ property: "className", value: "document" }]);
        this.documentForm = new DocumentForm({ $target: this.$document });

        this.init();
    }

    init() {
        this.$target.appendChild(this.$document);
    }

    setState(nextState) {
        this.state = nextState;
    }
}
