import DocumentList from './DocumentList/documentList.js';
import DocumentForm from './DocumentForm/documentForm.js';
import { createNewElement } from '../../../Util/element.js';

export default class Document {
    constructor({ $target }) {
        this.$target = $target;
        this.$document = createNewElement('div', [{ property: 'className', value: 'document' }]);

        this.init();
    }

    init() {
        this.render();
    }

    render() {
        this.documentForm = new DocumentForm({
            $target: this.$document,
            onSubmitCallback: () => this.documentList.getDocumentList(),
        });
        this.documentList = new DocumentList({
            $target: this.$document,
            initalState: { documnetList: [] },
            onClickCallback: (parentId, title) => this.documentForm.postDocument(parentId, title),
        });
        this.$target.appendChild(this.$document);
    }
}
