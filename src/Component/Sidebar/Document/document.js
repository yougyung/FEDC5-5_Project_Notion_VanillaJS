import DocumentList from './DocumentList/documentList.js';
import DocumentForm from './DocumentForm/documentForm.js';
import { createNewElement } from '../../../Util/element.js';
import { request } from '../../../Service/document.js';
import Observer from '../../../Store/userObserver.js';

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

    // document 데이터 삭제하기
    async deleteDocument(documentId) {
        if (documentId) {
            const currentUser = Observer.getInstance().getState();
            const res = await request(`/documents/${documentId}`, currentUser, { method: 'DELETE' });

            if (res) {
                this.getDocumentList();
            }
        }
    }
}
