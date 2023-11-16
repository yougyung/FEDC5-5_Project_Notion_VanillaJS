import Editor from "../component/Editor.js";
import Title from "../common/Title.js";
import { request } from "../utils/api.js";
import { push } from "../utils/handleRouteEvent.js";
import { getPathData } from "../utils/getPathData.js";
import { store } from "../main.js";
import { fetchCurrentDocumentAsync } from "../modules/documentsDuck.js";
import Component from "../core/Component.js";

// initialState : {doucmentId :null, document:null}
export default class DocumentPage extends Component {
  constructor({ $target, props }) {
    super({ $target, props, tagName: "div" });
    this.getCurrentDocument();
    this.data;
  }
  prepare() {
    this.wrapper.classList.add("document-page");
    const [path, documentId = pathData] = getPathData();
    this.documentId = documentId;
  }
  getCurrentDocument() {
    store.dispatch(fetchCurrentDocumentAsync(this.documentId));
    const { id, title } = this.data;
    this.render();
    this.editor.renderContent();
  }
  render() {
    this.wrapper.innerHTML = "";
    this.$target.replaceChildren(this.wrapper);
    this.data = store.useSelector(
      (state) => state.documentsReducer.selectedDocument,
      this.render.bind(this)
    );
    const { id, title, content } = this.data;
    this.documentHeader = new Title({
      $target: this.wrapper,
      initialState: {
        href: id,
        title,
      },
    });
    let timerOfSetTimeout = null;
    this.editor = new Editor({
      $target: this.wrapper,
      initialState: {
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
          documentHeader.setState({ title: response.title });
        }, 1500);
      },
    });
  }
}
