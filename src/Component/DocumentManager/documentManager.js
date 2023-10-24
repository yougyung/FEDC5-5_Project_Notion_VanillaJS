import DocumentEditor from './DocumentEditor/DocumentEditor.js';
import ChildDocumentsViewer from './ChildDocumentsViewer/ChildDocumentsViewer.js';
import DocumentContentViewr from './DocumentContentViewer/DocumentContentViewer.js';
import { createNewElement } from '../../Util/Element.js';
import { fetchGetDocumentContent, fetchPutDocument } from '../../Service/PostApi.js';
import { DOCUMENT_CONTENT_SAVE_KEY, getItem, setItem, removeItem } from '../../Store/LocalStroage.js';
import DocumentObserver from '../../Util/DocumentObserver.js';
import { getEndFocus } from '../../Util/getEndFoucus.js';

// state = { documentId : "" }

export default class DocumentManager {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;
        this.timer = null;

        this.init();
    }

    init() {
        this.$documentManager = createNewElement('div', [{ property: 'className', value: 'document-manager' }]);

        this.documentEditor = new DocumentEditor({
            $taregt: this.$documentManager,
            initalState: { ...this.state },
            onEditing: (nextState) => {
                if (this.timer !== null) {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(async () => {
                    this.putDocumentContent(nextState);
                }, 1000);
            },
        });
        // this.documentContentViewer = new DocumentContentViewr({
        //     $target: this.$documentManager,
        //     initalState: { ...this.state },
        // });
        this.childDocumentsViewer = new ChildDocumentsViewer({
            $target: this.$documentManager,
            initalState: { documentList: [] },
        });

        this.$target.appendChild(this.$documentManager);
        //this.$documentManager.addEventListener('click', (e) => this.HandleOnclick(e));

        // 사이드바에서 document가 수정되면 자식 document도 최신화를 해줘야한다.
        DocumentObserver.getInstance().subscribe(this.observerCallback.bind(this));
        this.getDocumentContent(this.state.documentId);
    }

    // 해당 document content 가져오기
    async getDocumentContent(documentId) {
        const { id, title, content, updatedAt, documents } = await fetchGetDocumentContent(documentId);
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
            // 그래서 불러오는 함수를 옵저버에서 삭제해준다.
            DocumentObserver.getInstance().unsubscribe(this.observerCallback.bind(this));
            DocumentObserver.getInstance().notifyAll();
            DocumentObserver.getInstance().subscribe(this.observerCallback.bind(this));
        } else {
            alert('수정 실패!');
        }
    }

    observerCallback() {
        this.getDocumentContent(this.state.documentId);
    }

    // HandleOnclick(e) {
    //     const { className } = e.target;
    //     // 미리보기 버튼
    //     if (className === 'title-and-button__button') {
    //         const { isView } = this.state;

    //         this.setState({ ...this.state, isView: !isView });
    //     }
    // }
}
