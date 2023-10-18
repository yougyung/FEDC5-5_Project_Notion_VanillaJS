import DocumentList from "../component/DocumentList.js";
import { request } from "../utils/api.js";

export default function NavPage({ $target, initialState }) {
  const $nav = document.createElement("nav");
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    $target.appendChild($nav);
    documentList.setState(this.state);
  };
  const documentList = new DocumentList({
    $target: $nav,
    initialState: this.state,
    createDocument: async (id) => {
      const body = { title: "새 Document", parent: id ? id : null };
      const response = await request("/documents", {
        method: "POST",
        body: JSON.stringify(body),
      });
      console.log(`문서생성완료: ${response}`);
    },
    deleteDocument: async (id) => {
      await request(`/documents/${id}`, {
        method: "DELETE",
      });
    },
  });
}
