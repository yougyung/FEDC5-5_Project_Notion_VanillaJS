import ListItem from "../component/ListItem.js";
import ListHeader from "../component/ListHeader.js";
import { push } from "../../util/router.js";
import { request } from "../../util/api.js";

export default function ListPage({ $target, initialState }) {
  const $docList = document.createElement("div");
  $docList.classList = "sidebar-list";
  this.state = initialState;
  let isInitialize = true;
  const $newDocButton = document.createElement("div");
  $newDocButton.classList = "new-folder";
  $newDocButton.textContent = "새로운 폴더 생성";

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
  $newDocButton.addEventListener("click", async () => {
    const req = await request("/documents", {
      method: "POST",
      body: JSON.stringify({ parent: null, title: "새로 생성된 파일" }),
    });
    await this.fetchDocumentsList();
    push(`/documents/${req.id}`);
  });

