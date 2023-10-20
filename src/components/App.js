import DocumentList from "./DocumentList.js";
import DocumentEditSection from "./DocumentEditSection.js";
import { request } from "../utils/api.js";
import { initRouter, push } from "../utils/route.js";

export default function App({ $target }) {
  const documentList = new DocumentList({
    $target,
    initialState: [],
    onDocumentItemClick: (id) => {
      push(`/document/${id}`);
    },
  });

  const $editorSection = document.createElement("div");
  $target.appendChild($editorSection);
  $editorSection.setAttribute("class", "editor-section");

  const documentEditSection = new DocumentEditSection({
    $target: $editorSection,
    initialState: {
      documentId: 0,
      document: {
        title: "",
        content: "",
      },
    },
  });

  this.route = () => {
    const { pathname } = window.location;
    $editorSection.innerHTML = "";
    if (pathname === "/") {
      $editorSection.innerHTML = "<h1>아직 문서를 선택하지 않았습니다.</h1>";
    } else if (pathname.indexOf("/document/") === 0) {
      const [, , documentId] = pathname.split("/");
      documentEditSection.setState({
        documentId,
        document: {
          title: "",
          content: "",
        },
      });
    }
  };

  this.route();

  const fetchDocments = async () => {
    const documents = await request("/documents");
    documentList.setState(documents);
  };

  fetchDocments();

  initRouter(() => this.route());
}
