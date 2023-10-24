import DocumentsPage from "./components/DocumentsPage.js";
import ContentsPage from "./components/ContentsPage.js";
import { initRouter, push } from "./utils/router.js";
import { request } from "./utils/api.js";

export default function App({ $target }) {
  const $app = document.createElement("div");
  $target.appendChild($app);

  this.state = [];
  this.setState = (nextState) => {
    this.state = nextState;
  };

  const documentsPage = new DocumentsPage({
    $target: $app,
    initialState: this.state,
    // 여기서 add는 POST 요청
    onAddDocument: async (id = "") => {
      if (id) {
        // parent가 있는 document 통신
        const res = await request(`/documents`, {
          method: "POST",
          body: JSON.stringify({
            title: "제목 없음",
            parent: id,
          }),
        });
        push(`/documents/${res.id}`);
      } else {
        // parent가 없는 document 통신. 즉 root
        const res = await request(`/documents`, {
          method: "POST",
          body: JSON.stringify({
            title: "제목 없음",
            parent: null,
          }),
        });
        push(`/documents/${res.id}`);
      }
      await this.route();
    },
    onDelete: async (id) => {
      await request(`/documents/${id}`, {
        method: "DELETE",
      });
      history.replaceState(null, null, "/");
      await this.route();
    },
  });

  const contentPage = new ContentsPage({
    $target: $app,
  });

  this.route = async () => {
    const { pathname } = window.location;

    const documents = await request("/documents");
    documentsPage.setState(documents);

    if (pathname === "/") {
      // documentsPage.setState(documents);
      contentPage.setState("");
    } else {
      const [, , documentsId] = pathname.split("/");
      contentPage.setState({ documentsId });
    }
  };
  this.route();
  initRouter(() => this.route());
}
