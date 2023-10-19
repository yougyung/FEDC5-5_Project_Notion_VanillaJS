import Sidebar from "./sidebar/Sidebar.js";
import DocumentEditPage from "./textEditor/DocumentEditPage.js";
import { request } from "./utils/api.js";
import { initRouter, push } from "./utils/router.js";
import { getItem, removeItem } from "./utils/storage.js";

export default function App({ $target }) {
  const onAdd = async () => {
    push("new");

    const createdDocument = await request("", {
      method: "POST",
      body: JSON.stringify({
        title: "",
        parent: getItem("new-parent", null),
      }),
    });

    history.replaceState(null, null, `${createdDocument.id}`);
    removeItem("new-parent");

    documentEditPage.setState({ documentId: createdDocument.id });

    sidebar.setState({
      selectedId: parseInt(createdDocument.id),
    });
  };

  const sidebar = new Sidebar({
    $target,
    initialState: {
      selectedDocumentId: null,
    },
    onAdd,
  });

  const documentEditPage = new DocumentEditPage({
    $target,
    initialState: {
      documentId: "new",
      document: {
        title: "",
        content: "",
      },
    },
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      return;
    }

    if (pathname.indexOf("/") === 0) {
      const documentId = pathname.substring(1);

      console.log(pathname, documentId);

      documentEditPage.setState({
        documentId: isNaN(documentId) ? documentId : parseInt(documentId),
      });

      if (!isNaN(documentId)) {
        sidebar.setState({
          selectedId: parseInt(documentId),
        });
      }
    }
  };

  // window.addEventListener("popstate", () => this.route());

  this.route();

  initRouter(() => this.route());
}
