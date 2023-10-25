import { createNewElement } from '../../../Util/Element.js';
import { convertToMarkup } from '../../../Util/Markup.js';
import { getEndFocus } from '../../../Util/Focus.js';

// state = { title : "", content: "" }

export default class DocumentEditor {
    constructor({ $taregt, initalState, onEditing }) {
        this.$taregt = $taregt;
        this.state = initalState;
        this.onEditing = onEditing;

        this.init();
    }

    init() {
        this.$editor = createNewElement('div', [{ property: 'className', value: 'editor' }]);
        this.$title = createNewElement('input', [
            { property: 'type', value: 'text' },
            { property: 'name', value: 'title' },
            { property: 'className', value: 'editor__title' },
            { property: 'placeholder', value: '제목을 입력해주세요' },
        ]);
        this.$content = createNewElement('div', [
            { property: 'name', value: 'content' },
            { property: 'className', value: 'editor__content' },
            { property: 'contentEditable', value: true },
        ]);

        this.$editor.appendChild(this.$title);
        this.$editor.appendChild(this.$content);
        this.$taregt.appendChild(this.$editor);

        this.$editor.addEventListener('keyup', (e) => this.HandleOnKeyup(e));
        this.render();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        const { title, content } = this.state;
        const markupText = convertToMarkup(content);

        console.log(markupText);

        this.$title.value = title;
        this.$content.innerHTML = markupText ?? '';
    }

    // 수정하면 onEditing으로 DB에 수정하고 View 컴포넌트에 전달해준다.
    HandleOnKeyup(e) {
        const {
            target,
            target: { value, innerHTML, name },
        } = e;

        if (name === 'title') {
            const nextState = { ...this.state, [name]: value };

            this.setState(nextState);
            this.onEditing(nextState, target);
        }

        // 한글 입력시 2번의 이벤트를 받는다. timer로 지연시켜 마지막 입력 값을 가져온다.
        if (name === 'content') {
            clearTimeout(this.inputTimeout); // 이전 setTimeout을 취소
            this.inputTimeout = setTimeout(() => {
                // 새로운 setTimeout을 설정
                const nextState = { ...this.state, [name]: innerHTML };

                this.setState(nextState);
                this.onEditing(nextState);
                getEndFocus(target);
            }, 500); // 500ms 동안 추가 입력이 없으면 입력 완료로 간주
        }
    }
}
