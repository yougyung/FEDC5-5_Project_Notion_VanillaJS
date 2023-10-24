import DocumentItems from '../DocumentItems.js';
import { createNewElement } from '../../../../Util/Element.js';
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
        const $titleButton = createNewElement('div', [
            {
                property: 'className',
                value: `${documentId && Number(documentId) === id ? 'title-button--current' : 'title-button'}`,
            },
        ]);
        const $titleToggle = createNewElement('div', [{ property: 'className', value: 'title-toggle' }]);
        const $title = createNewElement(
            'span',
            [{ property: 'className', value: 'title-toggle__title' }],
            title ? title : '제목 없음'
        );
        const $toggleButton = createNewElement(
            'button',
            [{ property: 'className', value: 'title-toggle__toggle' }],
            '>'
        );
        const $insertDelete = createNewElement('div', [{ property: 'className', value: 'insert-delete' }]);
        const $insertButton = createNewElement(
            'button',
            [{ property: 'className', value: 'insert-delete__insert' }],
            '+'
        );
        const $deleteButton = createNewElement(
            'button',
            [{ property: 'className', value: 'insert-delete__delete' }],
            'x'
        );

        this.$target.appendChild($li);
        $li.appendChild($titleButton);
        $titleButton.appendChild($titleToggle);
        $titleButton.appendChild($insertDelete);
        $titleToggle.appendChild($toggleButton);
        $titleToggle.appendChild($title);
        $insertDelete.appendChild($insertButton);
        $insertDelete.appendChild($deleteButton);

        // 현재 document에 자식 documets가 존재하면 현재 $li 자식으로 다시 ul 태그를 생성한다.
        if (documents.length > 0) {
            new DocumentItems({
                $target: $li,
                initalState: { documentList: documents, isRoot: false },
            });
        }
    }
}
