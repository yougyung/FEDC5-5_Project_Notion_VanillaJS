import DocumentList from './DocumentList/documentList.js';
import DocumentForm from './DocumentForm/documentForm.js';
import { createNewElement } from '../../../Util/element.js';
import { request } from '../../../Service/document.js'

// state = { currentUser : "...", documentList: [] }

export default class Document {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;
        this.$document = createNewElement("div", [{ property: "className", value: "document" }]);
        this.documentForm = null;
        this.documentList = null;

        this.init();
    }

    init() {
        this.render();
        this.getDocumentList();
    }

    render() {
        this.$target.appendChild(this.$document);
        this.documentForm = new DocumentForm({ 
            $target: this.$document, 
            initalState: { currentUser: this.state.currentUser },
            callback: () => this.getDocumentList(),
        });
        this.documentList = new DocumentList({ $target: this.$document, initalState: this.state.documentList });
    }

    setState(nextState) {
        // 유저가 바뀌면 새로 해당 유저의 documentList를 불러와서 보여줘야한다.
        // 유저가 바뀌는 경우에만 form 컴포넌트에 state를 변경
        if(this.state.currentUser !== nextState.currentUser) {
            this.state = { currentUser: nextState.currentUser, documentList: [] };
            this.documentForm.setState({ currentUser: this.state.currentUser });
            return this.getDocumentList();
        }

        this.state = nextState;
        this.documentList.setState({ documentList: this.state.documentList });
    }

    // documentList 데이터 가져오기
    async getDocumentList() {
        const { currentUser } = this.state;
        const res = await request("/documents", currentUser);

        this.setState({ currentUser, documentList: res });
    }
}
