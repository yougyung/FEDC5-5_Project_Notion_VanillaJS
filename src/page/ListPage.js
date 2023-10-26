import ListItem from "../component/ListItem.js";
import ListHeader from "../component/ListHeader.js";
import { push } from "../../util/router.js";
import { request } from "../../util/api.js";

export default function ListPage({ $target, initialState }) {
  const $docList = document.createElement("div");
  $docList.classList = "sidebar-list";
  this.state = initialState;
  let isInitialize = true;
  this.render = () => {
    $docList.innerHTML = ``;
  };

  this.fetchDocumentsList = async () => {
    this.setState({ documentsTree: this.state.documentsTree, isLoading: true });
    const documents = await request("/documents");
    this.setState({ documentsTree: documents, isLoading: false });
  };
  const init = () => {
    if (isInitialize) {
      this.fetchDocumentsList();
      isInitialize = false;
    }
  };

  init();
