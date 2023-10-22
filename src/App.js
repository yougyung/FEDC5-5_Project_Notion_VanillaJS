import Sidebar from "./sideBar/Sidebar.js";
import DocumentEditPage from "./textEditor/DocumentEditPage.js";
import { ROUTE_DOCUMENTS ,NEW } from "./utils/contants.js";
import { initRouter, push } from "./utils/router.js";
import { removeItem, getItem } from "./utils/storage.js";
import { request } from "./utils/api.js";

export default function App({ $target }) {
  const onAdd = async () => {
    push(NEW);

    const createdDocument = await request(`${ROUTE_DOCUMENTS}`, {
      method: "POST",
      body: JSON.stringify({
        title: "",
        parent: getItem("NEW-PARENT", null),
      }),
    });

    history.replaceState(null, null, `${createdDocument.id}`);
    removeItem("NEW-PARENT");

    documentEditPage.setState({ documentId: createdDocument.id });
  };
  $target.style.display = "flex";
  const sideBar = new Sidebar({
    $target,
    onAdd,
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
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname.indexOf(ROUTE_DOCUMENTS) === 0) {
      const [, , documentId] = pathname.split("/");
      documentEditPage.setState({ documentId });
    }
  };
  this.route();

  initRouter(() => this.route());
}
