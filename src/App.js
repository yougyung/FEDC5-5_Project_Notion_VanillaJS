import Sidebar from "./sideBar/Sidebar.js";
import DocumentEditPage from "./textEditor/DocumentEditPage.js";
import { ROUTE_DOCUMENTS } from "./utils/contants.js";
import { initRouter } from "./utils/router.js";

export default function App({ $target }) {
  $target.style.display = "flex";
  new Sidebar({
    $target,
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
