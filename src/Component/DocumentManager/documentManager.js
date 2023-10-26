import DocumentEditor from './DocumentEditor/DocumentEditor.js';
import ChildDocumentsViewer from './ChildDocumentsViewer/ChildDocumentsViewer.js';
import { createNewElement } from '../../Util/Element.js';
import { fetchGetDocumentContent, fetchPutDocument } from '../../Service/PostApi.js';
import { DOCUMENT_CONTENT_SAVE_KEY, getItem, setItem, removeItem } from '../../Store/LocalStroage.js';
import DocumentObserver from '../../Util/DocumentObserver.js';

// state = { documentId : "" }

export default class DocumentManager {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;

        this.init();
    }

    init() {
        this.$documentManager = createNewElement('div', [{ property: 'className', value: 'document-manager' }]);

        this.documentEditor = new DocumentEditor({
            $taregt: this.$documentManager,
            initalState: { ...this.state },
            onEditing: (nextState) => {
                clearTimeout(this.timer);
                this.timer = setTimeout(async () => {
                    this.putDocumentContent(nextState);
                }, 1000);
            },
        });
        this.childDocumentsViewer = new ChildDocumentsViewer({
            $target: this.$documentManager,
            initalState: { documentList: [] },
        });

        this.$target.appendChild(this.$documentManager);

        DocumentObserver.getInstance().subscribe(this.observerCallback.bind(this));
        this.getDocumentContent(this.state.documentId);
    }

    // 해당 document content 가져오기
    async getDocumentContent(documentId) {
        const { title, content, updatedAt, documents } = await fetchGetDocumentContent(documentId);
        const {
            title: localTitle,
            content: localContent,
            tempSaveData,
        } = getItem(DOCUMENT_CONTENT_SAVE_KEY(documentId), { title: '', content: '' });

        if (tempSaveData && tempSaveData > updatedAt) {
            if (confirm('저장되지 않은 데이터가 있습니다. 불러올까요?')) {
                this.childDocumentsViewer.setState({ documentList: documents });
                this.documentEditor.setState({ title: localTitle, content: localContent });
                return;
            }
        }

        this.childDocumentsViewer.setState({ documentList: documents });
        this.documentEditor.setState({ title, content });
    }

    // 해당 document content 수정하기
    async putDocumentContent(nextState) {
        const { documentId } = this.state;
        const { title, content } = nextState;

        setItem(DOCUMENT_CONTENT_SAVE_KEY(documentId), {
            ...nextState,
            tempSaveData: new Date(),
        });

        const res = await fetchPutDocument(documentId, title, content);

        if (res) {
            removeItem(DOCUMENT_CONTENT_SAVE_KEY(documentId));

            // content와 title이 수정되면 Editor 정보를 다시 불러와서 리렌더링을 할 필요가 없다.
            DocumentObserver.getInstance().unsubscribe(this.observerCallback.bind(this));
            DocumentObserver.getInstance().notifyAll();
            DocumentObserver.getInstance().subscribe(this.observerCallback.bind(this));
        } else {
            alert('수정 실패!');
        }
    }

    // 옵저버 unsubscribe 삭제를 위해 같은 메모리의 함수를 등록
    observerCallback() {
        this.getDocumentContent(this.state.documentId);
    }
}
