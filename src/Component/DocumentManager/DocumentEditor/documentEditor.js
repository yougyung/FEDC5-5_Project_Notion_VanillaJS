import { createNewElement } from '../../../Util/Element.js';

// state = { documentId : "", isView: boolean, title : "", content: "" }

export default class DocumentEditor {
    constructor({ $taregt, initalState, onEditing }) {
        this.$taregt = $taregt;
        this.state = initalState;
        this.onEditing = onEditing;

        this.init();
    }

    init() {
        this.$editor = createNewElement('div', [{ property: 'className', value: 'editor' }]);
        this.$titleAndButton = createNewElement('div', [{ property: 'className', value: 'title-and-button' }]);
        this.$button = createNewElement(
            'button',
            [{ property: 'className', value: 'title-and-button__button' }],
            '미리보기'
        );
        this.$title = createNewElement('input', [
            { property: 'type', value: 'text' },
            { property: 'name', value: 'title' },
            { property: 'className', value: 'title-and-button__title' },
            { property: 'placeholder', value: '제목을 입력해주세요...' },
        ]);
        this.$content = createNewElement('div', [
            { property: 'name', value: 'content' },
            { property: 'className', value: 'editor__content' },
            { property: 'contentEditable', value: true },
        ]);

        this.$editor.appendChild(this.$titleAndButton);
        this.$editor.appendChild(this.$content);
        this.$titleAndButton.appendChild(this.$title);
        this.$titleAndButton.appendChild(this.$button);
        this.$taregt.appendChild(this.$editor);

        this.$editor.addEventListener('keyup', (e) => this.HandleOnKeyup(e));
        this.render();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        const { isView, title, content } = this.state;

        this.$editor.classList.toggle('editor--hidden', isView);
        this.$editor.classList.toggle('editor--visible', !isView);

        this.$title.value = title;
        this.$content.innerHTML = content;
    }

    // 수정하면 onEditing으로 DB에 수정하고 View 컴포넌트에 전달해준다.
    async HandleOnKeyup(e) {
        const {
            target,
            target: { value, innerHTML, name },
        } = e;

        if (name === 'title') {
            const nextState = { ...this.state, [name]: value };

            this.onEditing(nextState);
        }
        if (name === 'content') {
            const nextState = { ...this.state, [name]: `${innerHTML}<span id="cur"></span>` };

            await this.onEditing(nextState);

            target.focus();

            const range = document.createRange();
            const selection = window.getSelection();

            // Make sure the element exists in the DOM before selecting it
            const curElement = document.getElementById('cur');
            if (curElement) {
                range.selectNode(curElement);

                selection.removeAllRanges();
                selection.addRange(range);

                range.deleteContents();
            }
        }
    }
}