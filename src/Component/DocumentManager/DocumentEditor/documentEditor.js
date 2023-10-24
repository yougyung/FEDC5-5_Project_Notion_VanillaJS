import { createNewElement } from '../../../Util/Element.js';
import { convertToMarkup } from '../../../Util/Markup.js';
import { getEndFocus } from '../../../Util/Focus.js';

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
        // this.$button = createNewElement(
        //     'button',
        //     [{ property: 'className', value: 'title-and-button__button' }],
        //     '미리보기'
        // );
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
        //this.$titleAndButton.appendChild(this.$button);
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
        const markupText = convertToMarkup(content);

        console.log(markupText);

        this.$editor.classList.toggle('editor--hidden', isView);
        this.$editor.classList.toggle('editor--visible', !isView);
        this.$title.value = title;
        this.$content.innerHTML = `\n\n\n안녕하세요          그래요`;
    }

    // 수정하면 onEditing으로 DB에 수정하고 View 컴포넌트에 전달해준다.
    HandleOnKeyup(e) {
        const {
            target,
            isComposing,
            target: { value, innerHTML, name },
        } = e;

        if (name === 'title') {
            const nextState = { ...this.state, [name]: value };

            this.setState(nextState);
            this.onEditing(nextState, target);
        }

        // isComposing 값으로 한글이 완성되었는지 확인한다. false면 한글입력이 모두 끝난 이벤트다.
        if (name === 'content' && !isComposing) {
            const nextState = { ...this.state, [name]: innerHTML };

            this.setState(nextState);
            this.onEditing(nextState);
            getEndFocus(target);
        }
    }
}
