import { Sidebar, DocumentEditPage } from "./components/index.js";
import { request, initRouter, push } from "./utils.js";

export default function App({ $target }) {
  let timer = null;

  const Init = () => {
    const $documentEditPage = document.querySelector(".document-edit-page");
    if ($documentEditPage) {
      $documentEditPage.remove();
    }

    history.pushState(null, null, "/");

    sidebar.render();
  };

  const onAdd = async (id) => {
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
    try {
      const document = await request(`${id}`);

      if (!document) {
        alert("존재하지 않는 페이지이므로 초기 페이지로 이동합니다.");
        this.route();
        return;
      }

      await request(`${id}`, {
        method: "DELETE",
      });

      Init();
    } catch (error) {
      console.log(error);
    }
  };

  const onEdit = ({ title, content }) => {
    console.log(title.length);
    try {
      const selectedDocumentSidebarTitle = document.querySelector(".list-item.selected .list-item-title");
      const selectedDocumentHeaderTitle = document.querySelector(".document-header-left");
      selectedDocumentSidebarTitle.textContent = title === null || title === "" ? "제목 없음" : title;
      selectedDocumentHeaderTitle.textContent = title === null || title === "" ? "제목 없음" : title;

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
    onDelete,
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      Init();
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

  window.addEventListener("popstate", () => this.route());

  this.route();

  initRouter(() => this.route());
}
