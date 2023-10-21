import IndexPage from "../../Page/IndexPage.js";
import Editor from "./Editor/Editor.js";
import SubPageList from "./SubPageList/SubPageList.js";

export default function PageViewer({ target, state, onEditing }) {
  const pageViewerElement = document.createElement("article");
  pageViewerElement.setAttribute("class", "pageViewer");
  target.appendChild(pageViewerElement);

  this.state = state;

  this.setState = (newState) => {
    this.state = newState;
    const { id, documents } = this.state;

    if (id === "Index") {
      indexPage.getElement().classList.add("view");
      editor.getElement().classList.remove("view");
      return;
    }
    indexPage.getElement().classList.remove("view");
    editor.getElement().classList.add("view");

    editor.setState(this.state);
    subPageList.setState(documents);
  };

  const indexPage = new IndexPage({
    target: pageViewerElement,
  });

  const editor = new Editor({
    target: pageViewerElement,
    state: this.state,
    onEditing,
  });

  const subPageList = new SubPageList({
    target: pageViewerElement,
    state: [],
  });
}
