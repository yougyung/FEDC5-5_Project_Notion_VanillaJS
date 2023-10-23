import DocumentItems from './DocumentItems/DocumentItems.js';
import { createNewElement } from '../../../../Util/Element.js';
import { fetchDeleteDocument, fetchGetDocumentList, fetchPostDocument } from '../../../../Service/PostApi.js';
import RouterManger from '../../../../Util/Router.js';
import DocumentObserver from '../../../../Util/DocumentObserver.js';

// state = { documentList: [] }

export default class DocumentList {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;

        this.init();
    }

    init() {
        this.$documentList = createNewElement('div', [{ property: 'className', value: 'document-list' }]);

        this.$target.appendChild(this.$documentList);
        this.$documentList.addEventListener('click', (e) => this.handleOnClick(e));

        // documnet가 수정되면 사이드바의 documentList도 수정되야 한다.
        DocumentObserver.getInstance().subscribe(() => this.getDocumentList());
        this.getDocumentList();
        this.render();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        const { documentList } = this.state;

        this.$documentList.replaceChildren();

        if (!documentList || documentList.length === 0) {
            return;
        }

        new DocumentItems({ $target: this.$documentList, initalState: { documentList, isRoot: true } });
    }

    handleOnClick(e) {
        const {
            target,
            target: { className },
        } = e;

        // document 추가 이벤트
        if (className === 'insert-delete__insert') {
            const documentId = target.closest('.document-item').dataset.id;

            this.postDocument(documentId);
        }

        // document 삭제 이벤트
        if (className === 'insert-delete__delete') {
            const documentId = target.closest('.document-item').dataset.id;

            this.deleteDocument(documentId);
        }

        // 해당 document 페이지로 이동
        if (className === 'title-toggle__title') {
            const documentId = target.closest('.document-item').dataset.id;

            RouterManger.getInstance().changeUrl(`/document/${documentId}`);
            DocumentObserver.getInstance().notifyAll();
        }
    }

    // document 데이터 가져오기
    async getDocumentList() {
        const res = await fetchGetDocumentList();

        if (res) {
            this.setState({ documentList: res });
        }
    }

    // document 데이터 추가하기
    async postDocument(documentId) {
        if (!documentId) {
            return;
        }
        const res = await fetchPostDocument(documentId);

        if (res) {
            this.getDocumentList();
        }
    }

    // document 데이터 삭제하기
    async deleteDocument(documentId) {
        if (!documentId) {
            return;
        }
        const res = await fetchDeleteDocument(documentId);

        if (res) {
            this.getDocumentList();
        }
    }
}
