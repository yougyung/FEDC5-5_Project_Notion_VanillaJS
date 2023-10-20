import DocumentEditor from './DocumentEditor/documentEditor.js';
import ChildDocumentsViewer from './ChildDocumentsViewer/ChildDocumentsViewer.js';
import { createNewElement } from '../../Util/element.js';

// state = { documentId : ""}

export default class DocumentManager {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;

        this.init();
    }

    init() {
        const $documentManager = createNewElement('div', [{ property: 'className', value: 'documentManager' }]);

        this.documentEditor = new DocumentEditor({ $taregt: this.$target, initalState: { ...this.state } });
        this.childDocumentsViewer = new ChildDocumentsViewer({ $taregt: this.$target, initalState: { ...this.state } });
        this.$target.appendChild($documentManager);
    }
}
