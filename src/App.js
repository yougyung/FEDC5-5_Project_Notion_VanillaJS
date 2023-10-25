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
  const $editorContainer = document.createElement("div");
  const $pageManagerContainer = document.createElement("div");

  $target.appendChild($pageManagerContainer);
  $target.appendChild($editorContainer);

  const $pageList = new PageList({
    $target: $pageManagerContainer,
    initialState: this.state.pageList,
  });
  // const $editor = new Editor({
  //   $target: $editorContainer,
  //   initialState: this.state.targetPage,
  // });

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    console.log(this.state);
    $pageList.render();
    //$editor.render();
    if (this.state.targetPage) {
    } else {
    }
  };
  fetchDocuments();
  this.render();
}
