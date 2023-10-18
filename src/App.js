import DocumentEditComponent from "./DocumentEditComponent.js";
import DocumentListComponent from "./DocumentListComponent.js";
import { initRouter } from "./router.js";

export default function App({ $target }) {
  const $documentListDiv = document.createElement("div");
  $documentListDiv.className = "documentListDiv";
  const $documentEditDiv = document.createElement("div");
  $documentEditDiv.className = "documentEditDiv";

  $target.appendChild($documentListDiv);
  $target.appendChild($documentEditDiv);

  this.state = {
    selectedDocument: null,
  };
  //문서 리스트
  const documentListComponent = new DocumentListComponent({
    $target: $documentListDiv,
  });

  const documentEditComponent = new DocumentEditComponent({
    $target: $documentEditDiv,
    initialState: {
      id: "95907",
      title: "",
      content: "",
      documents: [],
    },
  });

  //   this.setState = (nextState) => {
  //     this.state = nextState;
  //     this.render();
  //   };

  this.route = () => {
    const { selectedDocument } = this.state;

    const { pathname } = window.location;
    documentListComponent.setState();
    if (pathname.indexOf("/documents/") === 0) {
      $documentEditDiv.style.display = selectedDocument ? "block" : "none";
      // const [, , postId] = pathname.split("/");

      // postEditPage.setState({ postId });
    }
  };
  this.route();
  initRouter(() => this.route());
  window.addEventListener("popstate", () => {
    this.route();
  });
}
