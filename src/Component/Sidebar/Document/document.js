import DocumentList from './DocumentList/documentList.js';
import DocumentForm from './DocumentForm/documentForm.js';
import { createNewElement } from '../../../Util/element.js';
import { request } from '../../../Service/document.js';
import Observer from '../../../Store/userObserver.js';

// state = { documentList: [] }

export default class Document {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;
        this.$document = createNewElement('div', [{ property: 'className', value: 'document' }]);

        this.init();
    }

    init() {
        this.render();
        this.getDocumentList();
    }

    render() {
        this.documentForm = new DocumentForm({
            $target: this.$document,
            onSubmitPost: (parent, title) => this.postDocument(parent, title),
        });
        this.documentList = new DocumentList({
            $target: this.$document,
            initalState: this.state.documentList,
            onClickPost: (parentId, title) => this.postDocument(parentId, title),
            onClickDelete: (documentId) => this.deleteDocument(documentId),
        });
        this.$target.appendChild(this.$document);
    }

    setState(nextState) {
        // 유저가 바뀌면 새로 해당 유저의 documentList를 불러와서 보여줘야한다.
        if (this.state.currentUser !== nextState.currentUser) {
            this.state = { currentUser: nextState.currentUser, documentList: [] };
            return this.getDocumentList();
        }

        this.state = nextState;
        this.documentList.setState({ documentList: this.state.documentList });
    }

    // documentList 데이터 가져오기
    async getDocumentList() {
        const { currentUser } = this.state;
        const documentList = await request('/documents', currentUser);

        this.setState({ currentUser, documentList });
    }

    // document 데이터 추가하기
    async postDocument(parentId, title = '문서 제목') {
        const { currentUser } = this.state;
        const res = await request('/documents', currentUser, {
            method: 'POST',
            body: JSON.stringify({ title, parent: parentId }),
        });

        if (res) {
            this.getDocumentList();
        }
    }

    // document 데이터 삭제하기
    async deleteDocument(documentId) {
        if (documentId) {
            const { currentUser } = this.state;
            const res = await request(`/documents/${documentId}`, currentUser, { method: 'DELETE' });

            if (res) {
                this.getDocumentList();
            }
        }
    }
}
