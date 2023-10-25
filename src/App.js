import DocumentEditPage from "./components/DocumentEditPage/DocumentEditPage.js";
import SidebarContainer from "./components/Sidebar/SidebarContainer.js";
import { fetchDocuments } from "./utils/api.js";
import { DEFAULT_DOCUMENT_ID, DOCUMENTS_ROUTE, NEW, NEW_PARENT, OPENED_ITEM } from "./utils/constants.js";
import { initRouter, push } from "./utils/router.js";
import { setItem, getItem } from "./utils/storage.js";

export default function App({ $target }) {
  let timer = null;

  const onAdd = async () => {
    push(`${DOCUMENTS_ROUTE}/${NEW}`);

    const createdDocument = await fetchDocuments("", {
      method: "POST",
      body: JSON.stringify({
        title: document.title,
        parent: getItem(NEW_PARENT, null),
      }),
    });
    history.replaceState(null, null, `${DOCUMENTS_ROUTE}/${createdDocument.id}`);
    removeItem(NEW_PARENT);

    documentEditPage.setState({ documentId: createdDocument.id });
    sidebarContainer.render();
  };

  const onDelete = async (documentId) => {
    if (!confirm("페이지를 삭제하시겠습니까?")) return;

    await fetchDocuments(documentId, {
      method: "DELETE",
    });

    const openedItems = getItem(OPENED_ITEM, []);
    const index = openedItems.indexOf(documentId);
    if (index > -1) {
      setItem(OPENED_ITEM, [...openedItems.slice(0, index), ...openedItems.slice(index + 1)]);
    }

    const currentId = documentEditPage.state.documentId;
    if (currentId === documentId) {
      documentEditPage.setState({ documentId: DEFAULT_DOCUMENT_ID });
      push(`${DOCUMENTS_ROUTE}/${DEFAULT_DOCUMENT_ID}`);
    } else {
      documentEditPage.setState({ documentId: currentId });
    }

    sidebar.render();
  };

  const onEdit = ({ id, title, content }) => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(async () => {
      const editedDocument = await fetchDocuments(id, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
      });

      documentEditPage.setState({
        documentId: editedDocument.id,
        document: editedDocument,
      });

      sidebar.render();
    }, 600);
  };

  const sidebarContainer = new SidebarContainer({
    $target,
    onAdd,
    onDelete,
  });

  const documentEditPage = new DocumentEditPage({
    $target,
    initialState: {
      documentId: null,
      document: {
        title: "",
        content: "",
      },
    },
    onDelete,
    onEdit,
  });

  this.route = () => {
    const { pathname } = window.location;
    if (pathname === "/") {
      setDocumentTitle("Notion");
    } else if (pathname.indexOf(DOCUMENTS_ROUTE) === 0) {
      const [, , documentId] = pathname.split("/");
      documentEditPage.setState({ documentId });
    }
  };

  window.addEventListener("popstate", () => this.route());

  this.route();

  initRouter(() => this.route());
}
