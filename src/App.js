import { request } from "./api/api.js";
import Editor from "./components/Editor/Editor.js";
import PageList from "./components/PageManager/PageList.js";

export default function App({ $target }) {
  this.state = {
    pageList: [],
    targetPage: {},
    targetPageDocuments: [],
  };

  const fetchDocuments = async () => {
    const documents = await request("/documents");
    $pageList.setState(documents);
    //this.setState({ ...this.state, pageList: documents });
    //$pageList.setState(documents);
  };
  const $pageManagerContainer = document.createElement("div");
  const $editorContainer = document.createElement("div");

  $pageManagerContainer.className = "page_manager_container";
  $editorContainer.className = "editor_container";
  $target.appendChild($pageManagerContainer);
  $target.appendChild($editorContainer);

  const $pageList = new PageList({
    $target: $pageManagerContainer,
    initialState: this.state.pageList,
    onPageDelete: async (pageId) => {
      await request(`/documents/${pageId}`, {
        method: "DELETE",
      });
      this.setState({
        ...this.state,
        selectedDocument: null,
      });
    },
  });
  const $editor = new Editor({
    $target: $editorContainer,
    initialState: this.state.targetPage,
  });

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = async () => {
    console.log(this.state);
    await fetchDocuments();
    //$editor.render();
    if (this.state.targetPage) {
    } else {
    }
  };

  fetchDocuments();
  this.render();
}
