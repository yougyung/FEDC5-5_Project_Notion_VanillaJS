import DocumentEditPage from "./components/DocumentEditPage.js";
import SidebarContainer from "./components/SidebarContainer.js";
import { fetchDocuments } from "./utils/api.js";
import { DOCUMENTS_ROUTE, NEW, NEW_PARENT, OPENED_ITEM } from "./utils/constants.js";
import { initRouter, push } from "./utils/router.js";
import { setItem, getItem } from "./utils/storage.js";

export default function App({ $target }) {
  let timer = null;

  const onAdd = async (documentId) => {
    setItem(NEW_PARENT, documentId === NEW ? null : documentId);
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
    const nextDocumentId =
      documentEditPage.state.documentId === documentId ? DEFAULT_DOCUMENT_ID : documentEditPage.state.documentId;

    push(`${DOCUMENTS_ROUTE}/${nextDocumentId}`);
    documentEditPage.setState({ documentId: nextDocumentId });

    sidebar.render();
  };

  const onEdit = (document) => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(async () => {
      const editedDocument = await fetchDocuments(documentEditPage.state.documentId, {
        method: "PUT",
        body: JSON.stringify(document),
      });

      documentEditPage.setState({
        documentId: editedDocument.id,
        document: editedDocument,
      });

      sidebar.render();
    }, 1000);
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
    //$target.innerHTML = ''
    const { pathname } = window.location;

    if (pathname.indexOf("/documents") === 0) {
      const [, , documentId] = pathname.split("/");
      //console.log(pathname);
      //console.log(documentId);
      documentEditPage.setState({ documentId });
    }
  };

  this.route();

  initRouter(() => this.route());
}
