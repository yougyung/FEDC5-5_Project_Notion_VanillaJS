import DocumentItems from '../../Sidebar/Document/DocumentList/DocumentItems/DocumentItems.js';
import { createNewElement } from '../../../Util/Element.js';
import RouterManger from '../../../Util/Router.js';
import { fetchDeleteDocument, fetchPostDocument } from '../../../Service/PostApi.js';

// state = { documentList: [] }

export default class ChildDocumentsViewer {
    constructor({ $target, initalState, postDocumentCallback }) {
        this.$target = $target;
        this.state = initalState;
        this.postDocumentCallback = postDocumentCallback;

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
        if (className === 'document-item__insert') {
            const getDocumentId = window.location.pathname.split('/')[2];
            const postDocumentId = target.closest('.document-item').dataset.id;
            const res = await fetchPostDocument(postDocumentId);

            if (res) {
                this.postDocumentCallback(getDocumentId);
            }
        }

        // document 삭제 이벤트
        if (className === 'document-item__delete') {
            const getDocumentId = window.location.pathname.split('/')[2];
            const deleteDocumentId = target.closest('.document-item').dataset.id;

            console.log(deleteDocumentId);
            const res = await fetchDeleteDocument(deleteDocumentId);

            if (res) {
                console.log('삭제성공');
                this.postDocumentCallback(getDocumentId);
            }
        }

        // 해당 document 페이지로 이동
        if (className === 'document-item__title') {
            const documentId = target.closest('.document-item').dataset.id;

            RouterManger.getInstance().changeUrl(`/document/${documentId}`);
        }
    }
}
