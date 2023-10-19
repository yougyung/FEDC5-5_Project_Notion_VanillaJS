import IndexPage from "../../Page/IndexPage.js";
import Editor from "./Editor/Editor.js";
import SubPageList from "./SubPageList/SubPageList.js";

export default function PageViewer({ target, state, onEditing }) {
  const pageViewerElement = document.createElement("article");
  pageViewerElement.setAttribute("class", "pageViewer");
  target.appendChild(pageViewerElement);

  this.state = state;

  this.setState = (newState) => {
    pageViewerElement.replaceChildren();
    this.state = newState;

    this.render();
  };

  this.render = () => {
    const { id, documents } = this.state;

    if (id === "Index") {
      return new IndexPage({
        target: pageViewerElement,
      });
    }

    new Editor({
      target: pageViewerElement,
      state: this.state,
      onEditing,
    });

    new SubPageList({
      target: pageViewerElement,
      documents,
    });
  };

  this.render();
}
