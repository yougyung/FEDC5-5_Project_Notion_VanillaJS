import NavPage from "./page/NavPage.js";
import { request } from "./utils/api.js";

export default function App({ $target, initialState }) {
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.route();
  };
  this.getDocuments = async () => {
    const documentsTree = await request("/documents");
    this.setState(documentsTree);
  };
  const navPage = new NavPage({
    $target,
    initialState: this.state,
    createDocument: async (id) => {
      const body = { title: "새 Document", parent: id ? id : null };
      const response = await request("/documents", {
        method: "POST",
        body: JSON.stringify(body),
      });
      console.log(response);
      this.getDocuments();
    },
    deleteDocument: async (id) => {
      await request(`/documents/${id}`, {
        method: "DELETE",
      });
      this.getDocuments();
    },
  });
  this.route = () => {
    $target.innerHTML = "";
    const { pathname } = window.location;
    if (pathname === "/") {
      navPage.setState(this.state);
    }
  };
  this.getDocuments();
}
