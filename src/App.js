import { Sidebar, DocumentEditPage } from "./components/index.js";
import { request, initRouter } from "./utils/index.js";

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

  const createDocument = async (title, parent) => {
    try {
      const { id: newId, ...newDocument } = await request("/documents", {
        method: "POST",
        body: JSON.stringify({
          title,
          parent,
        }),
      });

      history.replaceState(null, null, `${newId}`);

      documentEditPage.setState({
        documentId: newId,
        document: newDocument,
      });

      sidebar.setState({
        ...sidebar.state,
        selectedDocumentId: parseInt(newId),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onAdd = async (id) => {
    try {
      if (id === "new") {
        // 새 루트 문서 생성
        createDocument("", null);
      } else if (typeof id === "number") {
        // 새 하위 문서 생성
        createDocument("", id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (id) => {
    try {
      const document = await request(`/documents/${id}`);

      if (!document) {
        alert("존재하지 않는 페이지이므로 초기 페이지로 이동합니다.");
        this.route();
        return;
      }

      await request(`/documents/${id}`, {
        method: "DELETE",
      });

      Init();
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
        const editedDocument = await request(`/documents/${documentId}`, {
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
