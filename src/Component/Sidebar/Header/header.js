import { createNewElement } from '../../../Util/Element.js';

export default class Header {
    constructor({ $target, userName }) {
        this.$target = $target;
        this.userName = userName;

        this.init();
    }

    init() {
        const $header = createNewElement('div', [{ property: 'className', value: 'header' }]);
        const $userName = createNewElement(
            'h3',
            [{ property: 'className', value: 'header__user-name' }],
            `${this.userName}님의 Notion`
        );

        $header.appendChild($userName);
        this.$target.appendChild($header);
    }
}
