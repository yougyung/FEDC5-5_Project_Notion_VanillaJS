// state = { documentId : "" title : "", content: "" }

import { createNewElement } from '../../../Util/element.js';

export default class DocumentEditor {
    constructor({ $taregt, initalState, onEditing }) {
        this.$taregt = $taregt;
        this.state = initalState;
        this.onEditing = onEditing;

        this.init();
    }

    init() {
        this.$title = createNewElement('input', [
            { property: 'type', value: 'text' },
            { property: 'name', value: 'title' },
            { property: 'className', value: 'documentManager__title' },
        ]);
        this.$content = createNewElement('div', [
            { property: 'name', value: 'content' },
            { property: 'contentEditable', value: true },
        ]);

        this.$taregt.appendChild(this.$title);
        this.$taregt.appendChild(this.$content);
        this.$title.addEventListener('keyup', (e) => this.HandleOnKeyup(e));
        this.$content.addEventListener('input', (e) => this.HandleOnInput(e));
        this.render();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        const { title, content } = this.state;

        this.$title.value = title;
        this.$content.innerHTML = content;
    }

    HandleOnKeyup(e) {
        const { value: title } = e.target;
        const nextState = { ...this.state, title };

        this.setState(nextState);
        this.onEditing(this.state);
    }

    HandleOnInput(e) {
        const { innerHTML: content } = e.target;
        const nextState = { ...this.state, content };

        this.setState(nextState);
        this.onEditing(this.state);
    }
}
