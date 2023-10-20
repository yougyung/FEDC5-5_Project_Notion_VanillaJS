import { createNewElement } from '../../../../Util/element.js';
import Observer from '../../../../Store/userObserver.js';
import { request } from '../../../../Service/document.js';

export default class DocumentForm {
    constructor({ $target, onSubmitCallback }) {
        this.$target = $target;
        this.onSubmitCallback = onSubmitCallback;
        this.$documentForm = createNewElement('form', [{ property: 'className', value: 'title-and-form' }]);

        this.init();
    }

    init() {
        this.render();
        this.$documentForm.addEventListener('submit', (e) => this.handleOnSubmit(e));
    }

    render() {
        const $title = createNewElement(
            'span',
            [{ property: 'className', value: 'title-and-form__title' }],
            'Document'
        );
        const $button = createNewElement('button', [{ property: 'className', value: 'title-and-form__button' }], '+');

        this.$target.appendChild(this.$documentForm);
        this.$documentForm.appendChild($title);
        this.$documentForm.appendChild($button);
    }

    // document 추가 핸들러
    handleOnSubmit(e) {
        e.preventDefault();
        const { className } = e.target;

        if (className === 'title-and-form') {
            this.postDocument(null);
        }
    }

    // document 데이터 추가하기 API
    async postDocument(parentId, title = '문서 제목') {
        const currentUser = Observer.getInstance().getState();
        const res = await request('/documents', currentUser, {
            method: 'POST',
            body: JSON.stringify({ title, parent: parentId }),
        });

        if (res) {
            this.onSubmitCallback();
        }
    }
}
