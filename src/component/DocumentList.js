import Component from "../core/Component.js";
import { addDependOnPathEvent } from "../utils/handleRouteEvent.js";
import DocumentItem from "./DocumentItem.js";

export default class DocumentList extends Component {
  constructor({ $target, props, depth = 0 }) {
    super({ $target, tagName: "div", props });
    this.wrapper.classList.add("document-list");
    this.depth = depth;
    if (this.depth > 0) {
      this.wrapper.classList.add("document-children", "display-none");
    }
    this.highlightSelectedDocument();
    addDependOnPathEvent(this.highlightSelectedDocument);
  }
  highlightSelectedDocument() {
    const documentList = document.querySelectorAll(".document-item-inner");
    const { pathname } = window.location;
    const [, , pathdata] = pathname.split("/");
    documentList.forEach((node) => {
      if (node.parentNode.dataset.id === pathdata) {
        node.classList.add("selected-document");
      } else {
        node.classList.remove("selected-document");
      }
    });
  }
  render() {
    //상태가 바뀔때, 렌더가 일어난다. 비워두지 않으면 현재 상태+새로운 상태가 되어 노드가 2배 생김
    this.wrapper.innerHTML = "";
    const { createDocument, removeDocument } = this.props;
    this.state.forEach((document) => {
      new DocumentItem({
        $target: this.wrapper,
        initialState: document,
        createDocument,
        removeDocument,
        depth: this.depth + 1,
        highlightSelectedDocument: this.highlightSelectedDocument,
      });
    });
  }
}
