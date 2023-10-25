import DocumentEditPage from "./components/DocumentEditPage/DocumentEditPage.js";
import SidebarContainer from "./components/Sidebar/SidebarContainer.js";
import { fetchDocuments } from "./utils/api.js";
import { DEFAULT_DOCUMENT_ID, DOCUMENTS_ROUTE, NEW, NEW_PARENT, OPENED_ITEMS } from "./utils/constants.js";
import { initRouter, push } from "./utils/router.js";
import { setItem, getItem } from "./utils/storage.js";
import { setDocumentTitle } from "./utils/validation.js";

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
    sidebarContainer.setState({
      selectedId: parseInt(createdDocument.id),
    });
  };

  const onDelete = async (documentId) => {
    if (!confirm("페이지를 삭제하시겠습니까?")) return;

    await fetchDocuments(documentId, {
      method: "DELETE",
    });

    const openedItems = getItem(OPENED_ITEMS, []);
    const index = openedItems.indexOf(documentId);
    if (index > -1) {
      setItem(OPENED_ITEMS, [...openedItems.slice(0, index), ...openedItems.slice(index + 1)]);
    }

    const currentId = documentEditPage.state.documentId;
    if (currentId === documentId) {
      documentEditPage.setState({ documentId: DEFAULT_DOCUMENT_ID });
      push(`${DOCUMENTS_ROUTE}/${DEFAULT_DOCUMENT_ID}`);
    } else {
      documentEditPage.setState({ documentId: currentId });
    }

    sidebarContainer.render();
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

      sidebarContainer.render();
    }, 800);
  };

  const sidebarContainer = new SidebarContainer({
    $target,
    initialState: {
      selectedId: null,
    },
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
      documentEditPage.setState({
        documentId: isNaN(documentId) ? documentId : parseInt(documentId),
      });
      if (isNaN(documentId)) return;
      sidebarContainer.setState({
        selectedId: parseInt(documentId),
      });
    }
  };

  window.addEventListener("popstate", () => this.route());

  this.route();

  initRouter(() => this.route());
}
