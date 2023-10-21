// state = { documentId : "" title : "", content: "" }

import { createNewElement } from '../../../Util/element.js';

export default class DocumentEditor {
    constructor({ $taregt, initalState, onEditing }) {
        this.$taregt = $taregt;
        this.state = initalState;
        this.onEditing = onEditing;
        this.copyedState = this.state;

        this.init();
    }

    init() {
        this.$title = createNewElement('input', [
            { property: 'type', value: 'text' },
            { property: 'name', value: 'title' },
            { property: 'className', value: 'documentManager__title' },
        ]);
        this.$content = createNewElement('textarea', [
            { property: 'name', value: 'content' },
            { property: 'contentEditable', value: true },
        ]);

        this.$taregt.appendChild(this.$title);
        this.$taregt.appendChild(this.$content);
        this.$title.addEventListener('keyup', (e) => this.HandleOnKeyup(e));
        this.$content.addEventListener('input', (e) => this.HandleOnInput(e));
        this.render();
        const markupContent = this.convertToMarkup('## 지인혁\n### 지인혁\n** 지인혁**\n * 지인혁');
        console.log(markupContent);
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

        // 입력 이벤트 발생할 때 마다 리렌더링이 발생하면 포커스를 잃어 맨 앞에 텍스트가  추가된다.
        //this.setState(nextState);
        this.onEditing(nextState);
    }

    convertToMarkup(text) {
        let lines = text.split('\n');

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];

            // Headers
            if (line.startsWith('# ')) {
                line = `<h1>${line.slice(2)}</h1>`;
            } else if (line.startsWith('## ')) {
                line = `<h2>${line.slice(3)}</h2>`;
            } else if (line.startsWith('### ')) {
                line = `<h3>${line.slice(4)}</h3>`;
            }

            // Unordered list items
            else if (line.startsWith('* ')) {
                line = `<li>${line.slice(2)}</li>`;
                // If the previous or next lines are not list items, add <ul> tags
                if (i === 0 || !lines[i - 1].startsWith('* ')) {
                    line = '<ul>' + line;
                }
                if (i === lines.length - 1 || !lines[i + 1].startsWith('* ')) {
                    line += '</ul>';
                }
            }

            // Bold and italic text
            let boldPattern = /\*\*(.*?)\*\*/g;
            let italicPattern = /\*(.*?)\*/g;

            line = line.replace(boldPattern, '<strong>$1</strong>');
            line = line.replace(italicPattern, '<em>$1</em>');

            // Links
            let linkPattern = /\[(.*?)\]\((.*?)\)/g;
            line = line.replace(linkPattern, '<a href="$2">$1</a>');

            lines[i] = line;
        }

        return lines.join('\n');
    }
}
