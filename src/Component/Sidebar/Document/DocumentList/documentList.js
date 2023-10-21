import DocumentItems from './DocumentItems/documentItems.js';
import { createNewElement } from '../../../../Util/element.js';
import { request } from '../../../../Service/document.js';
import Router from '../../../../Util/router.js';
import Observer from '../../../../Store/userObserver.js';

// state = { documentList: [] }
export default class DocumentList {
    constructor({ $target, initalState, onClickCallback }) {
        this.$target = $target;
        this.state = initalState;
        this.onClickCallback = onClickCallback;
        this.$documentDiv = createNewElement('div', [{ property: 'className', value: 'document-list' }]);

        this.init();
    }

    init() {
        // 유저가 바뀌면 새로 해당 유저의 documentList를 불러와서 보여줘야한다.
        Observer.getInstance().subscribe((currentUser) => this.getDocumentList());
        this.$documentDiv.addEventListener('click', (e) => this.handleOnClick(e));
        this.$target.appendChild(this.$documentDiv);
        this.getDocumentList();
        this.render();
    }

    render() {
        const { documentList } = this.state;

        this.$documentDiv.replaceChildren();
        new DocumentItems({ $target: this.$documentDiv, initalState: { documentList, isRoot: true } });
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    handleOnClick(e) {
        const {
            target,
            target: { className },
        } = e;

        // document 추가
        if (className === 'document__buttons--insert') {
            const documentId = target.closest('.document__item').dataset.id;

            this.onClickCallback(documentId);
        }

        // document 삭제
        if (className === 'document__buttons--delete') {
            const documentId = target.closest('.document__item').dataset.id;

            this.deleteDocument(documentId);
        }

        // 해당 document 페이지로 이동
        if (className === 'title-and-buttons') {
            const documentId = target.closest('.document__item').dataset.id;
            const router = Router.getInstance();

            router.changeUrl(`/document/${documentId}`);
        }
    }

    // documnet 데이터 가져오기
    async getDocumentList() {
        const currentUser = Observer.getInstance().getState();
        const documentList = await request('/documents', currentUser);

        this.setState({ documentList });
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
