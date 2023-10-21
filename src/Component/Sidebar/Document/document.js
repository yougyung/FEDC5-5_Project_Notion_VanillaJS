import DocumentList from './DocumentList/DocumentList.js';
import DocumentForm from './DocumentForm/DocumentForm.js';
import { createNewElement } from '../../../Util/Element.js';
import { fetchGetDocumentList } from '../../../Service/PostApi.js';

export default class Document {
    constructor({ $target }) {
        this.$target = $target;

        this.init();
    }

    init() {
        const $document = createNewElement('div', [{ property: 'className', value: 'document' }]);

        new DocumentForm({
            $target: $document,
            onSubmitCallback: () => this.onSubmitCallback(),
        });
        this.documentList = new DocumentList({
            $target: $document,
            initalState: { documentList: [] },
        });

        this.$target.appendChild($document);
    }

    // Form 컴포넌트에서 Document 추가 후 로직
    async onSubmitCallback() {
        const res = await fetchGetDocumentList();

        if (res) {
            this.documentList.setState({ documentList: res });
        }
    }
}
