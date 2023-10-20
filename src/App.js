import { Sidebar, DocumentEditPage } from "./components/components.js";
import { request, initRouter, push } from "./utils.js";

export default function App({ $target }) {
  let timer = null;

  const onAdd = async (id) => {
    console.log(typeof id);
    try {
      if (id === "new") {
        push("new");

        const { id: newRootId } = await request("", {
          method: "POST",
          body: JSON.stringify({
            title: "",
            parent: null,
          }),
        });

        history.replaceState(null, null, `${newRootId}`);

        documentEditPage.setState({ documentId: newRootId });

        sidebar.setState({
          ...sidebar.state,
          selectedDocumentId: parseInt(newRootId),
        });
      } else if (typeof id === "number") {
        push(`${id}`);

        const { id: newSubId, ...newSubDocument } = await request("", {
          method: "POST",
          body: JSON.stringify({
            title: "",
            parent: id,
          }),
        });

        history.replaceState(null, null, `${newSubId}`);

        documentEditPage.setState({
          documentId: newSubId,
          document: newSubDocument,
        });

        const documents = await request("");

        sidebar.setState({
          ...this.state,
          documents,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (id) => {
    console.log(id, ": 삭제 요청");
    try {
      await request(`${id}`, {
        method: "DELETE",
      });
      // console.log(id, ": 삭제 완료");

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

  const onEdit = ({ title, content }) => {
    try {
      const { pathname } = window.location;
      const documentId = pathname.substring(1);

      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        const editedDocument = await request(documentId, {
          method: "PUT",
          body: JSON.stringify({ title, content }),
        });

        documentEditPage.setState({
          documentId: editedDocument.id,
          document: editedDocument,
        });

        sidebar.render();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const sidebar = new Sidebar({
    $target,
    initialState: {
      documents: [],
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
    onEdit,
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      return;
    }

    if (pathname.indexOf("/") === 0) {
      const documentId = pathname.substring(1);

      documentEditPage.setState({
        ...documentEditPage.state,
        documentId: isNaN(documentId) ? documentId : parseInt(documentId),
      });

      if (!isNaN(documentId)) {
        sidebar.setState({
          ...sidebar.state,
          selectedDocumentId: parseInt(documentId),
        });
      }
    }
  };

  // window.addEventListener("popstate", () => this.route());

  this.route();

  initRouter(() => this.route());
}
