import { createNewElement } from '../../../../Util/element.js';

export default class DocumentList {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.State = initalState;
        this.$documentList = createNewElement("div", [{ property: "className"}])
    }
}
