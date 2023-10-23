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
        const documentId = window.location.pathname.split('/')[2];

        const $li = createNewElement('li', [
            {
                property: 'className',
                value: 'document-item',
            },
            { property: 'dataset.id', value: id },
        ]);
        const $div = createNewElement('div', [
            {
                property: 'className',
                value: `${documentId && Number(documentId) === id ? 'title-button--current' : 'title-button'}`,
            },
        ]);
        const $title = createNewElement('span', [{ property: 'className', value: 'title-button__title' }], title);
        const $insertButton = createNewElement(
            'button',
            [{ property: 'className', value: 'title-button__insert' }],
            '+'
        );
        const $deleteButton = createNewElement(
            'button',
            [{ property: 'className', value: 'title-button__delete' }],
            '-'
        );

        $li.appendChild($div);
        $div.appendChild($title);
        $div.appendChild($insertButton);
        $div.appendChild($deleteButton);
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
