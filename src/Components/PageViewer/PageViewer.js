import IndexPage from "../../Page/IndexPage.js";
import Editor from "./Editor/Editor.js";
import SubPageList from "./SubPageList/SubPageList.js";

export default function PageViewer({ target, state, onEditing }) {
  const pageViewerElement = document.createElement("article");
  pageViewerElement.setAttribute("class", "pageViewer");
  target.appendChild(pageViewerElement);

  this.state = state;

  this.setState = (newState) => {
    console.log(newState);
    this.state = newState;

    // if (id === "Index") {
    //   return new IndexPage({
    //     target: pageViewerElement,
    //   });
    // }

    const { id, documents } = this.state;
    editor.setState(this.state);
    subPageList.setState(documents);
  };

  new IndexPage({
    target: pageViewerElement,
  });

  const editor = new Editor({
    target: pageViewerElement,
    state: this.state,
    onEditing,
  });

  const subPageList = new SubPageList({
    target: pageViewerElement,
    documents: [],
  });
}
