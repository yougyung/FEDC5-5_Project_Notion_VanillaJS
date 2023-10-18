import DocumentList from "./DocumentList.js";
import { request } from "./api.js";

export default function App({ $target }) {
  const $documnetListDiv = document.createElement("div");
  const $documentEditDiv = document.createElement("div");

  $target.appendChild($documnetListDiv);
  $target.appendChild($documentEditDiv);

  this.state = {
    selectedDocument: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;

    documnetList.setState(nextState);
    this.render();
  };
  this.render = () => {
    const { selectedDocument } = this.state;
    $documentEditDiv.style.display = selectedDocument ? "block" : "none";
  };

  //문서 리스트
  const documnetList = new DocumentList({
    $target,
  });

  const fetchDocumentList = async () => {
    const documentList = await request("/documents");
    this.setState({
      ...this.state,
      documentList,
    });
  };
  fetchDocumentList();
  this.render();
}
