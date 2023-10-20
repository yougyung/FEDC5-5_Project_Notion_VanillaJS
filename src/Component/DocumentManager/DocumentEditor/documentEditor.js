import Observer from '../../../Store/userObserver.js';
import { request } from '../../../Service/document.js';

// state = { documentId : "" title : "", content: ""}

export default class DocumentEditor {
    constructor({ $taregt, initalState }) {
        this.$taregt = $taregt;
        this.state = initalState;

        this.init();
    }

    init() {
        this.getDocumentContent();
    }

    render() {}

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    async getDocumentContent() {
        const { documentId } = this.state;
        const currentUser = Observer.getInstance().getState();
        const res = await request(`/documents/${documentId}`, currentUser);

        this.setState({ ...this.state, ...res });
        console.log(res);
    }
}
