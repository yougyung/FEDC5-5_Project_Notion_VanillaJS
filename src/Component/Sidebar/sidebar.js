import Header from './Header/Header.js';
import Document from './Document/Document.js';
import { getUserName } from '../../Util/userName.js';
import { createNewElement } from '../../Util/Element.js';

export default class Sidebar {
    constructor({ $target }) {
        this.$target = $target;

        this.init();
    }

    init() {
        const $sidebar = createNewElement('aside', [{ property: 'className', value: 'sidebar' }]);

        // user정보를 가지는 Header 컴포넌트 생성
        this.user = new Header({
            $target: $sidebar,
            userName: getUserName(),
        });
        // Document 정보를 가진 Document 컴포넌트 생성
        this.document = new Document({
            $target: $sidebar,
        });

        this.$target.appendChild($sidebar);
    }
}
