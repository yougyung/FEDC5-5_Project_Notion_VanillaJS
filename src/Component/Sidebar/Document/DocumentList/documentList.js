import DocumentItems from '../../../Common/DocumentItems/DocumentItems.js';
import { createNewElement } from '../../../../Util/Element.js';
import { fetchDeleteDocument, fetchGetDocumentList, fetchPostDocument } from '../../../../Service/PostApi.js';
import RouterManger from '../../../../Util/Router.js';
import DocumentObserver from '../../../../Util/DocumentObserver.js';
import { DOCUMENT_TOGGLE_KEY } from '../../../../Store/LocalStroage.js';

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

    async handleOnClick(e) {
        const {
            target,
            target: { className },
        } = e;

        if (className === 'title-toggle__toggle--view' || className === 'title-toggle__toggle--hidden') {
            const $ul = target.closest('.document-item').querySelector('ul');

            target.classList.toggle('title-toggle__toggle--view');
            target.classList.toggle('title-toggle__toggle--hidden');
            $ul.classList.toggle('hidden');
        }

        // document 추가 이벤트
        if (className === 'insert-delete__insert') {
            const $li = target.closest('.document-item');
            const documentId = $li.dataset.id;
            const toggleList = localStorage.getItem(DOCUMENT_TOGGLE_KEY, []);

            localStorage.setItem(DOCUMENT_TOGGLE_KEY, documentId);

            await this.postDocument(documentId);
            DocumentObserver.getInstance().notifyAll();
        }

        // document 삭제 이벤트
        if (className === 'insert-delete__delete') {
            const documentId = target.closest('.document-item').dataset.id;
            const path = window.location.pathname.split('/')[2];

            localStorage.removeItem();

            await this.deleteDocument(documentId);

            if (Number(documentId) === Number(path)) {
                RouterManger.getInstance().changeUrl(`/`);
            } else {
                DocumentObserver.getInstance().notifyAll();
            }
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
