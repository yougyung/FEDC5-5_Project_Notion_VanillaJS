import Header from '../Component/Header/hedaer.js';
import { createNewElement } from '../Component/Util/element.js';
import { request } from '../Service/document.js';

// state = { username : "..." }

export default class RootPage {
    constructor({ $target, initalState }) {
        this.$page = createNewElement("div", [{ property: "className", value: "document" }]);
        this.$target = $target;
        this.state = initalState;

        this.init();
    }

    init() {
        this.getDocumentList();
    }

    setState(nextState) {
        this.state = nextState;

        this.redner();
    }

    redner() {
        this.$target.appendChild(this.$page);
    }

    // documentList 데이터 가져오기
    async getDocumentList() {
        const res = await request("/documents", this.username);

        console.log(res)
    }
}
