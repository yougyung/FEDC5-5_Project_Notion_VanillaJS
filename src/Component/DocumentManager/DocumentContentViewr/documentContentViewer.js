import { createNewElement } from '../../../Util/Element.js';

// state = { documentId : "", isView: boolean, title : "", content: "" }

export default class DocumentContentViewr {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;

        this.init();
    }

    init() {
        this.$editor = createNewElement('div', [{ property: 'className', value: 'viewer' }]);
        this.$titleAndButton = createNewElement('div', [{ property: 'className', value: 'title-and-button' }]);
        this.$button = createNewElement(
            'button',
            [{ property: 'className', value: 'title-and-button__button' }],
            '수정하기'
        );
        this.$title = createNewElement('h1', [{ property: 'className', value: 'title-and-button__title' }]);
        this.$content = createNewElement('div', [
            { property: 'name', value: 'content' },
            { property: 'className', value: 'viewer__content' },
            { property: 'contentEditable', value: false },
        ]);

        this.$editor.appendChild(this.$titleAndButton);
        this.$editor.appendChild(this.$content);
        this.$titleAndButton.appendChild(this.$title);
        this.$titleAndButton.appendChild(this.$button);
        this.$target.appendChild(this.$editor);

        this.render();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        const { isView, title, content } = this.state;

        this.$editor.classList.toggle('viewer--hidden', !isView);
        this.$editor.classList.toggle('viewer--visible', isView);

        this.$title.innerHTML = title;
        this.$content.innerHTML = content && content;
    }
}
