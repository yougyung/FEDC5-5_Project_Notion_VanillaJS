import { createNewElement } from '../../../../../../Util/element.js';
import DocumentItems from '../../DocumentItems/documentItems.js';

// state = { id: "", titel = "", documents: [] }

export default class DocumentItem {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;

        this.init();
    }

    init() {
        this.render();
    }

    render() {
        const { id, title, documents } = this.state;
        const $li = createNewElement('li', [
            { property: 'className', value: 'document__item' },
            { property: 'dataset.id', value: id },
        ]);
        const $div = createNewElement('div', [{ property: 'className', value: 'title-and-buttons' }]);
        const $title = createNewElement('span', [{ property: 'className', value: 'title-and-buttons__title' }], title);
        const $buttons = createNewElement('div', [{ property: 'className', value: 'document__buttons' }]);
        const $insert = createNewElement(
            'button',
            [{ property: 'className', value: 'document__buttons--insert' }],
            '+'
        );
        const $delete = createNewElement(
            'button',
            [{ property: 'className', value: 'document__buttons--delete' }],
            '-'
        );

        $div.appendChild($title);
        $div.appendChild($buttons);
        $buttons.appendChild($insert);
        $buttons.appendChild($delete);
        $li.appendChild($div);
        this.$target.appendChild($li);

        // 현재 document에 자식 documets가 존재하면 현재 $li 자식으로 다시 ul 태그를 생성한다.
        if (documents.length > 0) {
            new DocumentItems({ $target: $li, initalState: { documentList: documents, isRoot: false } });
        }
    }
}
