import { createNewElement } from '../../../../../../Util/Element.js';
import DocumentItems from '../DocumentItems.js';

// state = { id: "", title = "", documents: [] }

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
            { property: 'className', value: 'document-item' },
            { property: 'dataset.id', value: id },
        ]);
        const $title = createNewElement('span', [{ property: 'className', value: 'document-item__title' }], title);
        const $insertButton = createNewElement(
            'button',
            [{ property: 'className', value: 'document-item__insert' }],
            '+'
        );
        const $deleteButton = createNewElement(
            'button',
            [{ property: 'className', value: 'document-item__delete' }],
            '-'
        );

        $li.appendChild($title);
        $li.appendChild($insertButton);
        $li.appendChild($deleteButton);
        this.$target.appendChild($li);

        // 현재 document에 자식 documets가 존재하면 현재 $li 자식으로 다시 ul 태그를 생성한다.
        if (documents.length > 0) {
            new DocumentItems({
                $target: $li,
                initalState: { documentList: documents, isRoot: false },
            });
        }
    }
}
