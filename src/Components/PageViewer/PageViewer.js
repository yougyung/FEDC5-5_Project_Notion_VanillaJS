import IndexPage from "../../Page/IndexPage.js";
import Editor from "./Editor/Editor.js";
import SubPage from "./SubPageList/SubPage.js";

export default function PageViewer({ target, state, onEditing }) {
  const pageViewerElement = document.createElement("article");
  pageViewerElement.setAttribute("class", "pageViewer");
  target.appendChild(pageViewerElement);

  this.state = state;

  this.setState = (newState) => {
    this.state = newState;
    const { id } = this.state;

    if (id === "Index") {
      indexPage.getElement().classList.add("view");
      editor.getElement().classList.remove("view");
      subPage.getElement().classList.remove("view");
      return;
    }

    indexPage.getElement().classList.remove("view");
    editor.getElement().classList.add("view");
    subPage.getElement().classList.add("view");

    editor.setState(this.state);
    subPage.setState(this.state);
  };

  const indexPage = new IndexPage({
    target: pageViewerElement,
  });

  const editor = new Editor({
    target: pageViewerElement,
    state: this.state,
    onEditing,
  });

  const subPage = new SubPage({
    target: pageViewerElement,
    state: this.state,
  });
}
