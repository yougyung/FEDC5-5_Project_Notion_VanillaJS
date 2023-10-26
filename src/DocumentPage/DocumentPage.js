import { request } from "../api.js";
import { setItem } from "../storage.js";
import { push } from "../router.js";
import DocumentUser from "./DocumentUser.js";
import DocumentList from "./DocumentList.js";

export default function DocumentPage({ $target, onDocumentDelete }) {
  const $page = document.createElement("div");
  $page.classList.add("document-page");

  new DocumentUser({ $target: $page });
  const documentList = new DocumentList({
    $target: $page,
    initialState: [],
    onDelete: async (postId) => {
      await request(`/documents/${postId}`, {
        method: "DELETE",
      });
      this.setState();
      onDocumentDelete();
    },
    onPost: (postId) => {
      setItem("parentId", postId);
      push("/documents/new");
    },
  });

  // documents GET 후 documentList.setState()호출
  this.setState = async () => {
    const documents = await request("/documents");
    documentList.setState(documents);
    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
