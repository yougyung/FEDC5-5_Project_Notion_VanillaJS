import DocumentList from './DocumentList/DocumentList.js';
import DocumentForm from './DocumentForm/DocumentForm.js';
import { createNewElement } from '../../../Util/Element.js';

export default class Document {
    constructor({ $target }) {
        this.$target = $target;

        this.init();
    }

    init() {
        const $document = createNewElement('setcion', [{ property: 'className', value: 'document' }]);

        new DocumentForm({
            $target: $document,
            onSubmitCallback: () => this.documentList.getDocumentList(),
        });
        this.documentList = new DocumentList({
            $target: $document,
            initalState: { documentList: [] },
        });

        this.$target.appendChild($document);
    }
}
