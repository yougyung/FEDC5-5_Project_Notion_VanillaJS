import Editor from "../component/Editor.js";
import Title from "../common/Title.js";
import { request } from "../utils/api.js";
import { getPathData } from "../utils/getPathData.js";
import { store } from "../main.js";
import { fetchCurrentDocumentAsync } from "../modules/documentsDuck.js";
import Component from "../core/Component.js";
import { observe, unobserve } from "../utils/observer/Observe.js";

// initialState : {doucmentId :null, document:null}
export default class DocumentPage extends Component {
  constructor({ $target, props }) {
    super({ $target, props, tagName: "div" });
  }
  prepare() {
    this.wrapper.classList.add("document-page");
    const [path, documentId = pathData] = getPathData();
    this.documentId = documentId;
    this.getCurrentDocument();
    this.rerender = () => this.render();
    observe(this.rerender);
  }
  getCurrentDocument() {
    store.dispatch(fetchCurrentDocumentAsync(this.documentId));
  }
  renderChild() {
    this.editor.renderContent();
  }
  render() {
    console.log("돜페이지 렌더됨");
    const data = store.useSelector(
      (state) => state.documentsReducer.selectedDocument
    );
    this.wrapper.innerHTML = "";
    const { id, title, content } = data;
    if (data.id) {
      this.documentHeader = new Title({
        $target: this.wrapper,
        props: {
          initialState: {
            href: id,
            title,
          },
        },
      });
      let timerOfSetTimeout = null;
      this.editor = new Editor({
        $target: this.wrapper,
        initialState: {
          id,
          title,
          content,
        },
        documentAutoSave: (documentId, requestBody) => {
          if (timerOfSetTimeout !== null) {
            clearTimeout(timerOfSetTimeout);
          }
          timerOfSetTimeout = setTimeout(async () => {
            const response = await request(`/documents/${documentId}`, {
              method: "PUT",
              body: JSON.stringify(requestBody),
            });
            this.documentHeader.setState({
              ...this.documentHeader.state,
              title: response.title,
            });
          }, 1500);
        },
      });
      this.renderChild();
    }
    unobserve(this.rerender);
  }
}
