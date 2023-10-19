import Sidebar from "./sidebar/Sidebar.js";
import DocumentEditPage from "./textEditor/DocumentEditPage.js";
import { request, initRouter, push, getItem, removeItem } from "./utils.js";

export default function App({ $target }) {
  const onAdd = async (id) => {
    try {
      if (id === "new") {
        push("new");

        const createDocument = await request("", {
          method: "POST",
          body: JSON.stringify({
            title: "",
            parent: null,
          }),
        });

        history.replaceState(null, null, `${createDocument.id}`);

        documentEditPage.setState({ documentId: createDocument.id });

        sidebar.setState({
          selectedId: parseInt(createDocument.id),
        });
      }

      if (isNaN(id) || typeof id === "string") {
        throw new Error("접근 가능한 id가 아닙니다.");
      }

      console.log(id);
      push(`${id}`);

      const createSubDocument = await request("", {
        method: "POST",
        body: JSON.stringify({
          title: "",
          parent: id,
        }),
      });

      console.log(createSubDocument);

      // history.replaceState(null, null, `${createdDocument.id}`);
      // removeItem("new-parent");

      documentEditPage.setState({ documentId: createSubDocument.id });

      sidebar.render();
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (id) => {
    try {
      await request(`${id}`, {
        method: "DELETE",
      });
      console.log(id, ": 삭제 완료");

      documentEditPage.setState({
        documentId: "new",
        document: {
          title: "",
          content: "",
        },
      });

      history.pushState(null, null, "/");

      sidebar.render();
    } catch (error) {
      console.log(error);
    }
  };

  const sidebar = new Sidebar({
    $target,
    initialState: {
      selectedDocumentId: null,
    },
    onAdd,
    onDelete,
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
