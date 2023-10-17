import HeaderAndDocumentList from '../Component/HeaderAndDocumentList/headerAndDoumentList.js';
import { createNewElement } from '../Util/element.js';
import { request } from '../Service/document.js';

// state = { currentUser : "..." }

export default class RootPage {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;
        this.$page = createNewElement("div", [{ property: "className", value: "wrap" }]);
        this.headerAndDocumentList = new HeaderAndDocumentList({ $target: this.$page, initalState: { currentUser: this.state.currentUser }});

    }

    init() {
        this.$target.appendChild(this.$page);
    }

    setState(nextState) {
        this.state = nextState;
        this.headerAndDocumentList.setState(nextState);
    }

    // documentList 데이터 가져오기
    async getDocumentList() {
        const res = await request("/documents", this.userName);

        console.log(res)
    }
}
