import { createNewElement } from '../../../../Util/element.js';

export default class DocumentForm {
    constructor({ $target, onSubmitPost }) {
        this.$target = $target;
        this.onSubmitPost = onSubmitPost;
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

    handleOnSubmit(e) {
        e.preventDefault();
        const { className } = e.target;

        if (className === 'title-and-form') {
            this.onSubmitPost(null);
        }
    }
}
