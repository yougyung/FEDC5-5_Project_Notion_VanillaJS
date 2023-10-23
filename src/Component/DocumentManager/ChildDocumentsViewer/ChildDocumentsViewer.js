import DocumentItems from '../../Sidebar/Document/DocumentList/DocumentItems/DocumentItems.js';
import { createNewElement } from '../../../Util/Element.js';
import RouterManger from '../../../Util/Router.js';
import { fetchDeleteDocument, fetchPostDocument } from '../../../Service/PostApi.js';
import DocumentObserver from '../../../Util/DocumentObserver.js';

// state = { documentList: [] }

export default class ChildDocumentsViewer {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;

        this.init();
    }

    init() {
        this.$documentChildList = createNewElement('div', [{ property: 'className', value: 'document-child-list' }]);

        this.$target.appendChild(this.$documentChildList);
        this.$documentChildList.addEventListener('click', (e) => this.handleOnClick(e));

        this.render();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        const { documentList } = this.state;

        this.$documentChildList.replaceChildren();
        if (!documentList || documentList.length === 0) {
            return;
        }
        new DocumentItems({ $target: this.$documentChildList, initalState: { documentList, isRoot: true } });
    }

    async handleOnClick(e) {
        const {
            target,
            target: { className },
        } = e;

        // document 추가 이벤트
        if (className === 'title-button__insert') {
            const postDocumentId = target.closest('.document-item').dataset.id;
            const res = await fetchPostDocument(postDocumentId);

            if (res) {
                // document가 수정되면 사이드바 및 자식 document viewer 최신화
                DocumentObserver.getInstance().notifyAll();
            }
        }

        // document 삭제 이벤트
        if (className === 'title-button__delete') {
            const deleteDocumentId = target.closest('.document-item').dataset.id;

            const res = await fetchDeleteDocument(deleteDocumentId);

            if (res) {
                // document가 수정되면 사이드바 및 자식 document viewer 최신화
                DocumentObserver.getInstance().notifyAll();
            }
        }

        // 해당 document 페이지로 이동
        if (className === 'title-button__title') {
            const documentId = target.closest('.document-item').dataset.id;

            RouterManger.getInstance().changeUrl(`/document/${documentId}`);
            DocumentObserver.getInstance().notifyAll();
        }
    }
}
