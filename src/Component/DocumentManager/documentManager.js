import DocumentEditor from './DocumentEditor/DocumentEditor.js';
import ChildDocumentsViewer from './ChildDocumentsViewer/ChildDocumentsViewer.js';
import DocumentContentViewr from './DocumentContentViewr/DocumentContentViewer.js';
import { createNewElement } from '../../Util/Element.js';
import { fetchGetDocumentContent, fetchPutDocument } from '../../Service/PostApi.js';
import { DOCUMENT_CONTENT_SAVE_KEY, getItem, setItem, removeItem } from '../../Store/LocalStroage.js';

// state = { documentId : "", isView: boolean, title : "", content: "" }

export default class DocumentManager {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;
        this.timer = null;

        this.init();
    }

    init() {
        this.$documentManager = createNewElement('div', [{ property: 'className', value: 'documentManager' }]);

        this.documentEditor = new DocumentEditor({
            $taregt: this.$documentManager,
            initalState: { ...this.state },
            onEditing: (documentState) => {
                if (this.timer !== null) {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(async () => {
                    this.putDocumentContent(documentState);
                }, 1000);
            },
        });
        this.documentContentViewer = new DocumentContentViewr({
            $target: this.$documentManager,
            initalState: { ...this.state },
        });
        this.childDocumentsViewer = new ChildDocumentsViewer({
            $taregt: this.$documentManager,
            initalState: { ...this.state },
        });

        this.$target.appendChild(this.$documentManager);
        this.$documentManager.addEventListener('click', (e) => this.HandleOnclick(e));
        this.getDocumentContent();
    }

    setState(nextState) {
        if (nextState.isView !== this.state.isView) {
            this.documentEditor.setState(nextState);
        }
        this.state = nextState;
        this.documentContentViewer.setState(nextState);
    }

    // 미리보기 버튼 토글 핸들러
    HandleOnclick(e) {
        const { className } = e.target;

        if (className === 'title-and-button__button') {
            const { isView } = this.state;

            this.setState({ ...this.state, isView: !isView });
        }
    }

    // 해당 document content 가져오기
    async getDocumentContent() {
        const { documentId } = this.state;
        const { id, title, content, updatedAt, documents } = await fetchGetDocumentContent(documentId);
        const {
            title: localTitle,
            content: localContent,
            tempSaveData,
        } = getItem(DOCUMENT_CONTENT_SAVE_KEY(documentId), { title: '', content: '' });

        if (tempSaveData && tempSaveData > updatedAt) {
            if (confirm('저장되지 않은 데이터가 있습니다. 불러올까요?')) {
                this.setState({ ...this.state, title: localTitle, content: localContent });
                return;
            }
        }

        this.setState({ ...this.state, title, content });
    }

    // 해당 document content 수정하기
    async putDocumentContent(documentState) {
        const { documentId, title, content } = documentState;

        setItem(DOCUMENT_CONTENT_SAVE_KEY(documentId), {
            ...documentState,
            tempSaveData: new Date(),
        });

        const res = await fetchPutDocument(documentId, title, content);

        if (res) {
            this.setState({ ...this.state, title, content });
            removeItem(DOCUMENT_CONTENT_SAVE_KEY(documentId));
        } else {
            alert('수정 실패!');
        }
    }
}
