import DocumentEditor from './DocumentEditor/documentEditor.js';
import ChildDocumentsViewer from './ChildDocumentsViewer/ChildDocumentsViewer.js';
import { createNewElement } from '../../Util/element.js';
import Observer from '../../Store/userObserver.js';
import { request } from '../../Service/document.js';
import { DOCUMENT_CONTENT_SAVE_KEY, getItem, setItem, removeItem } from '../../Store/localStroage.js';

// state = { documentId : ""}

export default class DocumentManager {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;
        this.tiemr = null;

        this.init();
    }

    init() {
        const $documentManager = createNewElement('div', [{ property: 'className', value: 'documentManager' }]);
        const { documentId } = this.state;

        this.documentEditor = new DocumentEditor({
            $taregt: $documentManager,
            initalState: { documentId, title: '', content: '' },
            onEditing: (documentState) => {
                if (this.timer !== null) {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(async () => {
                    this.putDocumentContent(documentState);
                }, 1000);
            },
        });
        this.childDocumentsViewer = new ChildDocumentsViewer({
            $taregt: $documentManager,
            initalState: { ...this.state },
        });
        this.$target.appendChild($documentManager);
        this.getDocumentContent();
    }

    // 해당 document content 가져오기
    async getDocumentContent() {
        const currentUser = Observer.getInstance().getState();
        const { documentId } = this.state;
        const { id, title, content, updatedAt, documents } = await request(`/documents/${documentId}`, currentUser);
        const {
            title: localTitle,
            content: localContent,
            tempSaveData,
        } = getItem(DOCUMENT_CONTENT_SAVE_KEY(id), { title: '', content: '' });

        if (tempSaveData && tempSaveData > updatedAt) {
            if (confirm('저장되지 않은 데이터가 있습니다. 불러올까요?')) {
                this.documentEditor.setState({ documentId: id, title: localTitle, content: localContent });
                return;
            }
        }

        this.documentEditor.setState({ documentId: id, title, content });
    }

    // 해당 document content 수정하기
    async putDocumentContent(documentState) {
        const currentUser = Observer.getInstance().getState();
        const { documentId, title, content } = documentState;
        setItem(DOCUMENT_CONTENT_SAVE_KEY(documentId), {
            ...documentState,
            tempSaveData: new Date(),
        });
        const res = await request(`/documents/${documentId}`, currentUser, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
        });

        if (res) {
            removeItem(DOCUMENT_CONTENT_SAVE_KEY(documentId));
        } else {
            alert('데이터베이스에 수정 실패했습니다!');
        }
    }
}
