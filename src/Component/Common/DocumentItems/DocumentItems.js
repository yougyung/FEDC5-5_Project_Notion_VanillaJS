import DocumentItem from './DocumentItem/DocumentItem.js';
import { createNewElement } from '../../../Util/Element.js';
// state = { documuentList: [], isRoot: boolean }

export default class DocumentItems {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;

        this.init();
    }

    init() {
        this.render();
    }

    render() {
        const { documentList, isRoot } = this.state;

        const className = isRoot ? 'document-items--root' : 'document-items';
        const $documentItems = createNewElement('ul', [{ property: 'className', value: `${className}` }]);
        const $fragment = document.createDocumentFragment();

        documentList?.forEach((item) => new DocumentItem({ $target: $fragment, initalState: { ...item } }));

        $documentItems.className += ' hidden';
        $documentItems.appendChild($fragment);
        this.$target.appendChild($documentItems);
    }
}
